import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

const SingleComment = () => {
	const router = useRouter();
	const {commentId} = router.query;
	const [comment,setComment] = useState(null);

	useEffect(()=>{
		if(commentId){
			fetch(`/api/comment/${commentId}`)
			.then((res)=>res.json())
			.then((data)=>{
				setComment(data.comment)
			})
		}
	},[commentId])

	if(!comment)return <p>Loading...</p>
	return (
		<div className="p-5">
			<h1 className="font-bold text-lg">{comment.email}</h1>
			<h2 className="font-semibold">{comment.content}</h2>
			<p>productId: {comment.productId}</p>
		</div>
	)
}

export default SingleComment