import { useState } from 'react';
import CommentTabs from './CommentTab';
import CommentList from './CommentList';
import { useMockComments } from '../../hooks/useMockComments';
import CloudList from './CloudList';
import { useMockClouds } from '../../hooks/useMockClouds';

export type CommentTabType = 'Comment' | 'Cloud';

const CommentsSection = () => {
  const [tab, setTab] = useState<CommentTabType>('Cloud');
  const { data: comments } = useMockComments();
  const { data: clouds } = useMockClouds();
  return (
    <div>
      <CommentTabs tab={tab} setTab={setTab} />
      {tab === 'Comment' && <CommentList comments={comments} />}
      {tab === 'Cloud' && <CloudList clouds={clouds} />}
    </div>
  );
};

export default CommentsSection;
