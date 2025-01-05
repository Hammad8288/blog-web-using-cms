"use client";
import React, { useState, useEffect } from "react";

interface Comment {
  text: string;
  timestamp: string; // Store the date and time
}

const CommentsSection = ({ slug }: { slug: string }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>("");

  // Local Storage se comments load karte hain
  useEffect(() => {
    const savedComments = JSON.parse(localStorage.getItem("comments") || "{}");
    setComments(savedComments[slug] || []);
  }, [slug]);

  // Naya comment add karne ka function
  const handleAddComment = () => {
    if (!newComment.trim()) {
      return; // Prevent empty comments
    }

    const savedComments = JSON.parse(localStorage.getItem("comments") || "{}");

    // Current date and time
    const now = new Date();
    const timestamp = now.toLocaleString(); // Format the date and time

    // Updated comments array for current slug
    const updatedComments = {
      ...savedComments,
      [slug]: [...(savedComments[slug] || []), { text: newComment, timestamp }],
    };

    // Local Storage mein save karein aur state update karein
    localStorage.setItem("comments", JSON.stringify(updatedComments));
    setComments(updatedComments[slug]);
    setNewComment(""); // Clear the input field
  };

  return (
    <div className="mt-8">
      <h2 className="font-bold text-lg flex justify-center items-center">
        Add your comments here
      </h2>

      {/* Comment Input */}
      <label htmlFor="comment" className="block font-medium mt-4">
        Write your comment:
      </label>
      <textarea
        id="comment"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Write a comment..."
        className="border w-full p-2 mt-2 rounded-md"
      />
      <button
        onClick={handleAddComment}
        className="mt-2 p-2 bg-blue-500 text-white rounded-md"
        disabled={!newComment.trim()}
      >
        Add Comment
      </button>

      {/* Comments List */}
      <div className="mt-6 ">
        {comments.length === 0 ? (
          <p className="text-gray-700">No comments yet. Be the first to comment!</p>
        ) : (
          comments.map((comment, index) => (
            <div
              key={index}
              className="p-4 mb-4 bg-gray-100 rounded shadow-md border flex flex-col sm:flex-row sm:justify-between"
            >
              <p className="text-gray-800">{comment.text}</p>
              <p className="text-gray-500 text-sm mt-1">
                {comment.timestamp} {/* Show the timestamp */}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentsSection;
