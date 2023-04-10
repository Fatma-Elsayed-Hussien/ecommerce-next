import Image from "next/image";
import { useState } from "react";

export default function Comment({ productId, comments }) {
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch("/api/comment", {
        method: "POST",
        body: JSON.stringify({ email, content, productId }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      setEmail("");
      setContent("");
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
     {/* --------------------- Form Add Comment ------------------- */}
      <div className="flex flex-row w-[50%] m-auto">
        <div className="card flex-shrink-0 w-[50%] shadow-2xl bg-base-100 mt-1">
          <div className="card-body py-5 px-8">
            <form onSubmit={handleSubmit}>
              <div className="form-control">
                <label htmlFor="email" className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="text"
                  id="email"
                  placeholder="email"
                  className="input input-bordered"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-control">
                <label htmlFor="comment" className="label">
                  <span className="label-text">Comment</span>
                </label>
                <textarea
                  id="comment"
                  className="textarea textarea-bordered focus:outline-none min-h-[7rem]"
                  placeholder="Write a comment"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                ></textarea>
              </div>
              <div className="form-control mt-3">
                <button type="submit" className="btn btn-primary capitalize">
                  {!loading ? "Publish" : "Loading..."}
                </button>
              </div>
            </form>
          </div>
        </div>
   
        {/* --------------------- Display Comments List ------------------- */}
        <div className="card flex-shrink-0 w-[50%] shadow-xl bg-base-100 mt-1 ml-2">
          <div className="card-body py-5 px-6 max-h-[20rem] overflow-y-scroll">
            {comments.filter((comment) => comment.productId === productId).length !== 0 ? (
              <h2 className="font-bold text-center text-lg text-purple-700">Comments</h2>
            ) : (
              <h2 className="font-bold text-center text-lg text-purple-700 flex justify-center items-center">No Comments Yet {":("}</h2>
            )}
            {comments
              .filter((comment) => comment.productId === productId)
              .map((comment) => (
                <div
                  key={comment._id}
                  className="flex flex-row border-2 p-2 rounded-lg border-gray-300 shadow-sm shadow-gray-300"
                >
                  <div className="avatar">
                    <div className="w-7 rounded-full">
                      <Image
                        src={
                          "https://img.freepik.com/free-icon/user_318-159711.jpg"
                        }
                        width="50px"
                        height="50px"
                        alt="avatar"
                      />
                    </div>
                  </div>
                  <div className="pl-3">
                    <h3 className="font-semibold">{comment.email}</h3>
                    <p>{comment.content}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
