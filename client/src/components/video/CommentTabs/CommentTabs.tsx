import { RefObject } from 'react';
import CommentList from './CommentList';
import CloudList from './CloudList';
import CommentWriter from './CommentWriter';
import CloudWriter from './CloudWriter';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from 'components/atoms/Tabs';

interface Props {
  videoRef: RefObject<HTMLVideoElement>;
}

const CommentTabs = ({ videoRef }: Props) => {
  return (
    <Tabs defaultValue="cloud" className="">
      <TabsList className="border border-b-0 rounded-t-lg">
        <TabsTrigger value="comment" className="rounded-tl-md">
          💬 댓글
        </TabsTrigger>
        <TabsTrigger value="cloud" className="rounded-tr-md">
          ☁️ 구름
        </TabsTrigger>
      </TabsList>
      <TabsContent value="comment" className="border rounded-b-lg">
        <CommentWriter />
        <CommentList />
      </TabsContent>
      <TabsContent value="cloud" className="border rounded-b-lg">
        <CloudWriter />
        <CloudList videoRef={videoRef} />
      </TabsContent>
    </Tabs>
  );
};

export default CommentTabs;
