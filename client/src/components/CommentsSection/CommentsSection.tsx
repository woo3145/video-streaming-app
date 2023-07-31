import { RefObject, useState } from 'react';
import CommentTabs from './CommentTab';
import CommentList from './CommentList';
import { useMockComments } from '../../hooks/useMockComments';
import { useMockClouds } from '../../hooks/useMockClouds';
import CloudCommentList from './CloudCommentList';
import { useVideoSeek } from '../../hooks/video/useVideoSeek';
import CommentWriter from './CommentWriter';
import CloudWriter from './CloudWriter';

interface Props {
  videoRef: RefObject<HTMLVideoElement>;
}

export type CommentTabType = 'Comment' | 'Cloud';

const CommentsSection = ({ videoRef }: Props) => {
  const [tab, setTab] = useState<CommentTabType>('Cloud');
  const { data: comments } = useMockComments();
  const { data: clouds } = useMockClouds();
  const { setCurrentVideoTime } = useVideoSeek(videoRef);
  return (
    <div>
      <CommentTabs tab={tab} setTab={setTab} />
      <div>{tab === 'Comment' && <CommentWriter />}</div>
      <div>{tab === 'Cloud' && <CloudWriter />}</div>
      <div>
        {tab === 'Comment' && <CommentList comments={comments} />}
        {tab === 'Cloud' && (
          <CloudCommentList
            clouds={clouds}
            setCurrentVideoTime={setCurrentVideoTime}
          />
        )}
      </div>
    </div>
  );
};

export default CommentsSection;
