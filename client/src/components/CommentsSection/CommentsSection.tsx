import { RefObject } from 'react';
import CommentList from './CommentList';
import CloudCommentList from './CloudCommentList';
import CommentWriter from './CommentWriter';
import CloudWriter from './CloudWriter';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../atoms/Tabs';

interface Props {
  videoRef: RefObject<HTMLVideoElement>;
}

const CommentsSection = ({ videoRef }: Props) => {
  return (
    <Tabs defaultValue="cloud" className="">
      <TabsList className="flex items-center justify-center">
        <TabsTrigger value="comment">💬 댓글</TabsTrigger>
        <TabsTrigger value="cloud">☁️ 구름</TabsTrigger>
      </TabsList>
      <TabsContent value="comment">
        <CommentWriter />
        <CommentList />
      </TabsContent>
      <TabsContent value="cloud">
        <CloudWriter />
        <CloudCommentList videoRef={videoRef} />
      </TabsContent>
    </Tabs>
  );
};

export default CommentsSection;
