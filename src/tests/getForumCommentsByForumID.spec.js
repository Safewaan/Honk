import React from 'react';
import { render, screen } from '@testing-library/react';
import Forum from '../componentsTest/ForumTest'

describe('<ForumTest />', () => {

  it('loads comments on first render', async () => {
    global.fetch = jest.fn(() => {
      Promise.resolve();
    })

    const loadGetForumCommentsByForumID = jest.fn().mockName('loadGetForumCommentsByForumID');
    render(<Forum loadGetForumCommentsByForumID={loadGetForumCommentsByForumID}/>);
    expect(loadGetForumCommentsByForumID).toHaveBeenCalled();

  });

  it('displays the time and date of the comment', () => {
    const noop = () => { };
    const comments = [
      {
        "id": 1, "forumID": 1, "userID": 2, "commentDateTime": "2023-02-23T05:00:00.000Z", "comment": "Test 2"
      }
    ]

    render(<Forum loadGetForumCommentsByForumID={noop} comments={comments} />);
    const string = new Date(new Date('2023-02-23T05:00:00.000Z').getTime() - (5 * 60 * 60 * 1000)).toLocaleString();
    expect(screen.getByText(`Comment Created:${string}`)).toBeInTheDocument();
  });
});

