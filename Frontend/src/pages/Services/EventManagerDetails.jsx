import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Star } from "lucide-react"; // Lucid icon
import { toast, ToastContainer } from "react-toastify"; // For notifications

const EventManagerDetails = () => {
  const { id } = useParams();
  const [eventManager, setEventManager] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [rating, setRating] = useState(1); // Local state for stars

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      rating: 1,
      reviewText: "",
    },
  });

  // Sync local state with react-hook-form
  useEffect(() => {
    setValue("rating", rating);
  }, [rating, setValue]);

  useEffect(() => {
    const fetchEventManagerDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:8001/api/eventManager/getEventManager/${id}`
        );
        if (response.data.status === 200 && response.data.data.length > 0) {
          setEventManager(response.data.data[0]);
        } else {
          setError("Event manager not found");
        }
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to fetch event manager details"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchEventManagerDetails();
  }, [id]);

  // Submit review handler with React Hook Form
  const onSubmitReview = async (data) => {
    try {
      setSubmitting(true);
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You need to be logged in to submit a review", {
          toastId: "auth-error",
          position: "top-center",
          autoClose: 5000,
        });
        return;
      }

      const response = await axios.post(
        `http://localhost:8001/api/review/addReview/${id}`,
        {
          rating: Number(data.rating),
          review: data.reviewText,
        },
        {
          headers: {
            "x-access-token": token,
            "Content-Type": "application/json",
          },
        }
      );

      // Check for successful response (200-299 status code)
      if (response.status >= 200 && response.status < 300) {
        // Update UI optimistically
        setEventManager((prev) => ({
          ...prev,
          avgReview:
            (prev.avgReview * prev.reviewCount + Number(data.rating)) /
            (prev.reviewCount + 1),
          reviewCount: prev.reviewCount + 1,
        }));

        toast.success("Review Submitted Successfully!", {
          toastId: "review-success",
          position: "top-center",
          autoClose: 2000,
          draggablePercent: 60,
        });

        reset();
        setRating(1);
        setShowReviewForm(false);
      } else {
        // Handle non-2xx status codes
        toast.warning(
          response.data.message || "Server returned unexpected response",
          {
            toastId: "server-warning",
          }
        );
        throw new Error(response.data.message || "Failed to submit review");
      }
    } catch (err) {
      console.error("Review submission error:", err);

      let errorMessage = "Failed to submit review. Please try again later.";

      if (err.response) {
        // Server responded with error status (4xx, 5xx)
        errorMessage =
          err.response.data.message ||
          err.response.data.error ||
          `Server error (${err.response.status})`;
      } else if (err.request) {
        // Request was made but no response received
        errorMessage = "No response from server - check your connection";
      } else {
        // Something happened in setting up the request
        errorMessage = err.message || errorMessage;
      }

      toast.error(errorMessage, {
        toastId: "review-error",
        position: "top-center",
        autoClose: 5000,
        draggablePercent: 60,
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading)
    return (
      <div className="text-white p-10">Loading event manager details...</div>
    );
  if (error) return <div className="text-red-500 p-10">Error: {error}</div>;
  if (!eventManager)
    return <div className="text-white p-10">No event manager found</div>;

  const {
    name = "N/A",
    profileImage = "",
    description = "No description available.",
    age = "N/A",
    gender = "N/A",
    address = "N/A",
    phone = "N/A",
    email = "N/A",
    avgReview = 0,
    service = [],
    previousWorkImages = [],
  } = eventManager;

  const DetailItem = ({ label, value }) => (
    <div className="bg-[#121212] p-4 rounded-lg shadow-md border border-white/5">
      <h4 className="text-sm text-[#D4AF37] font-medium">{label}</h4>
      <p className="text-gray-200 font-semibold break-words">{value}</p>
    </div>
  );

  return (
    <div className="bg-gradient-to-t from-[#000000] via-[#000000] to-[#94720049] text-white min-h-screen pt-5">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      {/* Collage Header */}
      <div className="relative w-5/6 mx-auto p-4 rounded-lg">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {previousWorkImages.slice(0, 8).map((img, idx) => (
            <div
              key={idx}
              className="relative w-full h-[150px] sm:h-[180px] rounded-md overflow-hidden shadow-md bg-gray-800"
            >
              <img
                src={`http://localhost:8001/uploads/${img}`}
                alt={`Work ${idx + 1}`}
                className="w-full h-full object-cover object-center transition duration-300 rounded-md"
                
              />
            </div>
          ))}
        </div>

        {/* Floating Profile Image */}
        <div className="absolute left-15 bottom-[-80px] z-20">
          <div className="w-50 h-50 rounded-full border-4 border-[#D4AF37]">
            <img
              src={
                profileImage
                  ? `http://localhost:8001/uploads/${profileImage}`
                  : "/src/assets/images/user.png"
              }
              alt={name}
              className="w-full h-full object-cover object-center rounded-full"
            />
          </div>
        </div>
      </div>

      <div className="min-h-screen bg-gradient-to-b from-[#000000] via-[#3e0000] to-[#000000] py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
          {/* Left Side: Gallery & Reviews */}
          <div className="md:w-1/2 bg-[#0D0D0D] p-6 py-10 rounded-xl shadow-xl border border-white/10 space-y-6">
            <h1 className="text-4xl font-semibold text-center text-[#D4AF37] mb-4">
              {name}
            </h1>
            <div className="w-full h-px bg-[#444444] opacity-30 mb-5"></div>
            <section>
              <p className="text-gray-300 leading-relaxed text-justify">
                {description}
              </p>
            </section>
            <div className="grid grid-cols-2 gap-4">
              <DetailItem label="Age" value={age} />
              <DetailItem label="Gender" value={gender} />
              <DetailItem label="Location" value={address} />
              <DetailItem label="Phone" value={phone} />
              <DetailItem label="Email" value={email} />
              <DetailItem label="Rating" value={`${avgReview.toFixed(1)}/5`} />
            </div>
            <section>
              <h3 className="text-xl font-semibold mb-4 text-[#FF5E5B]">
                Services Offered
              </h3>
              <div className="w-full h-px bg-[#444444] opacity-30 mb-5"></div>
              {service.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {service.map((item, index) => (
                    <div
                      key={index}
                      className=" p-[2px] rounded-lg shadow-md hover:shadow-lg transition-all"
                    >
                      <div className="bg-[#121212]/60 backdrop-blur-sm h-full flex items-center justify-center rounded-md px-4 py-5 sm:py-6 text-center border border-[#D4AF37]/50">
                        <span className="text-white text-base sm:text-lg font-bold tracking-wide">
                          {item}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 italic">No services listed.</p>
              )}
            </section>
          </div>

          {/* Right Side: Previous Work & Review Form */}
          <div className="md:w-1/2 space-y-6">
            {/* Previous Work Section */}
            <div className="bg-[#1A1A1A] p-6 rounded-xl shadow-xl border border-white/10">
              <h2 className="text-xl font-semibold text-[#FF5E5B] mb-4">
                Previous Work
              </h2>
              <div className="w-full h-px bg-[#444444] opacity-30 mb-5"></div>
              {previousWorkImages.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {previousWorkImages.map((image, index) => (
                    <img
                      key={index}
                      src={`http://localhost:8001/uploads/${image}`}
                      alt={`Previous work ${index + 1}`}
                      className="rounded-lg object-cover w-full h-35 shadow-md"
                    />
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 italic">No images uploaded.</p>
              )}
            </div>

            {/* Leave a Review Section */}
            <div className="bg-[#1A1A1A] p-6 rounded-xl shadow-xl border border-white/10">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Loved our <span className="text-[#D4AF37]">Services</span>?
                Leave a <span className="text-[#FF5E5B]">Review</span>!
              </h2>
              {!showReviewForm ? (
                <button
                  onClick={() => setShowReviewForm(true)}
                  className="bg-gradient-to-r from-[#FF5E5B] to-[#D4AF37] hover:from-[#D4AF37] hover:to-[#FF5E5B] text-white px-6 py-2 rounded-lg font-semibold transition"
                >
                  Add Review
                </button>
              ) : (
                <form
                  onSubmit={handleSubmit(onSubmitReview)}
                  className="space-y-4"
                >
                  {/* Star Rating Using Lucid Icon */}
                  <div>
                    <label className="block text-sm text-gray-300 mb-1">
                      Rating (1–5)
                    </label>
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className="focus:outline-none"
                        >
                          <Star
                            size={24}
                            fill={star <= rating ? "#FACC15" : "none"}
                            stroke={star <= rating ? "#FACC15" : "#6B7280"}
                          />
                        </button>
                      ))}
                    </div>
                    {/* Hidden Input for react-hook-form validation */}
                    <input
                      type="number"
                      {...register("rating", {
                        required: "Rating is required",
                        min: { value: 1, message: "Minimum rating is 1" },
                        max: { value: 5, message: "Maximum rating is 5" },
                      })}
                      value={rating}
                      onChange={() => {}}
                      className="hidden"
                    />
                    {errors.rating && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.rating.message}
                      </p>
                    )}
                  </div>

                  {/* Review Text */}
                  <div>
                    <label className="block text-sm text-gray-300 mb-1">
                      Your Review
                    </label>
                    <textarea
                      rows="4"
                      {...register("reviewText", {
                        required: "Review text is required",
                        minLength: {
                          value: 3,
                          message: "Review must be at least 3 characters long",
                        },
                        maxLength: {
                          value: 100,
                          message: "Review must not exceed 100 characters",
                        },
                      })}
                      placeholder="Write your feedback here..."
                      className="w-full bg-[#0D0D0D] border border-white/20 rounded-lg p-2 text-white"
                    ></textarea>
                    {errors.reviewText && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.reviewText.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Buttons */}
                  <div className="flex gap-3">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="bg-gradient-to-r from-[#FF5E5B] to-[#ff3936] text-white px-6 py-2 rounded-lg font-semibold hover:bg-gradient-to-r hover:from-[#ff3936] hover:to-[#FF5E5B] transition disabled:opacity-50"
                    >
                      {submitting ? "Submitting..." : "Submit Review"}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        reset();
                        setRating(1);
                        setShowReviewForm(false);
                      }}
                      className="bg-gray-700 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventManagerDetails;
