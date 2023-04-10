
import {getCommentData} from './index'
import {connectDatabase} from '../../../helpers/mongo'
import { ObjectId } from 'mongodb';
export default async function handler(req,res){
	const {commentId} = req.query;
	let client
	try{
		client = await connectDatabase();
	}catch(err){
		res.status(500).json({message:"error connecting to database"})
	}
	const db = client.db();
	const commentItem = await db.collection('comment').findOne({_id: new ObjectId(commentId)})
	console.log(commentItem)
	client.close();
	res.status(200).json({comment:{...commentItem,_id:commentItem._id.toString()}})
}