import React from 'react'
import {useRouter} from 'next/router'
import { getCommentData} from '../api/comment'


export const getServerSideProps = async (context)=>{
	const data = await getCommentData();
	const serializedData = data.map(comment=>({
		...comment,
		_id:comment._id.toString(),
	}))
	return {
		props:{
			data:serializedData || []
		}
	}
}



const Comment = (props) => {
	const router = useRouter();

	const {data} = props;
	if(!data.length)return <p>No Comment Yet</p>
	const handleComment = (id)=>{
		router.push(`/comment/${id}`)
	}
	return (
		<div className="p-5">
			{data.map(comment=>(
				<h1 key={comment._id} onClick={handleComment.bind(null,comment._id)} className="font-bold link text-blue-600 mb-3">
					{comment.email}
				</h1>
			))}
		</div>
	)
}

export default Comment