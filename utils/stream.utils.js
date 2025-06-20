import { StreamChat } from 'stream-chat';
const StreamClient = StreamChat.getInstance(process.env.NEXT_PUBLIC_STREAM_API_KEY)

export default StreamClient