import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { bindActionCreators, Dispatch } from 'redux';
import {
  User,
  ContentQuery,
  MultipleContentResponse,
  Profile
} from '../../../common';
import {
  Banner,
  Container,
  Tab,
  TabList,
  TabPanel,
  ContentPreviewList
} from '../components';
import { ApplicationState } from '../store';
import * as contentState from '../store/content';
import * as profileState from '../store/profile';

export interface ProfilePageProps
  extends RouteComponentProps<{ username: string }> {
  addRating: (id: string, rating: number) => void;
  content?: MultipleContentResponse;
  contentError?: Error;
  contentLoading: boolean;
  loadContent: (query?: ContentQuery) => void;
  loadProfile: (username: string) => void;
  profile?: Profile;
  profileError?: Error;
  profileLoading: boolean;
  updateRating: (id: string, rating: number) => void;
  unwatch: (id: string) => void;
  user?: User;
  watch: (id: string) => void;
}

export const DisconnectedProfilePage: React.FC<ProfilePageProps> = ({
  addRating,
  content,
  contentError,
  contentLoading,
  loadContent,
  loadProfile,
  profile,
  profileError,
  profileLoading,
  match: { params },
  updateRating,
  unwatch,
  user,
  watch
}) => {
  const [tab, setTab] = React.useState<'reviewed' | 'watch'>('watch');
  const watchTab = React.useRef(null);
  const reviewedTab = React.useRef(null);

  React.useEffect(() => {
    loadProfile(params.username);
    loadList();
  }, [params.username]);

  React.useEffect(() => {
    loadList();
  }, [tab]);

  const loadList = async () => {
    if (tab === 'reviewed') {
      await loadContent({ reviewed: params.username });
    } else {
      await loadContent();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.keyCode === 37 || e.keyCode === 39) {
      if (document.activeElement && document.activeElement.id === 'watch') {
        if (reviewedTab && reviewedTab.current) {
          (reviewedTab.current as any).focus();
        }
      } else if (
        document.activeElement &&
        document.activeElement.id === 'reviewed'
      ) {
        if (watchTab && watchTab.current) {
          (watchTab.current as any).focus();
        }
      }
    }
  };

  const handleRating = async (value: number, id: string, rated: boolean) => {
    if (user) {
      if (rated) {
        await updateRating(id, value);
      } else {
        await addRating(id, value);
      }
    }
  };

  const handleWatch = async (watching: boolean, id: string) => {
    if (user) {
      if (watching) {
        await unwatch(id);
      } else {
        await watch(id);
      }
    }
  };

  return (
    <div>
      {profile && !profileError && !profileLoading && (
        <>
          <Banner>
            <img src={profile.image} alt={`${profile.username}`} />
            <h1 className="banner__brand">{profile.username}</h1>
            <p className="banner__text">{profile.bio}</p>
          </Banner>
          {content && !contentLoading && !contentError && (
            <Container>
              <TabList>
                <Tab
                  id="watch"
                  innerRef={watchTab}
                  panelId="watch-list"
                  selected={tab}
                  onClick={() => setTab('watch')}
                  onKeyDown={handleKeyDown}
                >
                  Watch List
                </Tab>
                <Tab
                  id="reviewed"
                  innerRef={reviewedTab}
                  panelId="reviewed-panel"
                  selected={tab}
                  onClick={() => setTab('reviewed')}
                  onKeyDown={handleKeyDown}
                >
                  Reviewed
                </Tab>
              </TabList>
              <TabPanel selected={tab} id="watch-list" tabId="watch">
                <ContentPreviewList
                  contentList={content.allContent.filter(con => con.watchList)}
                  handleRating={handleRating}
                  handleWatch={handleWatch}
                  user={user}
                />
              </TabPanel>
              <TabPanel selected={tab} id="reviewed-panel" tabId="reviewed">
                <ContentPreviewList
                  contentList={content.allContent}
                  handleRating={handleRating}
                  handleWatch={handleWatch}
                  user={user}
                />
              </TabPanel>
            </Container>
          )}
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state: ApplicationState) => ({
  content: state.Content.response,
  contentError: state.Content.error,
  contentLoading: state.Content.loading,
  profile: state.Profile.response,
  profileError: state.Profile.error,
  profileLoading: state.Profile.loading,
  user: state.User.response
});

const actionCreators = {
  loadContent: (query?: ContentQuery) => contentState.load(query),
  loadProfile: (username: string) => profileState.load(username),
  addRating: (id: string, rating: number) => contentState.addRating(id, rating),
  updateRating: (id: string, rating: number) =>
    contentState.updateRating(id, rating),
  watch: (id: string) => contentState.watch(id),
  unwatch: (id: string) => contentState.unwatch(id)
};

const mapActionsToProps = (dispatch: Dispatch) => ({
  ...bindActionCreators(actionCreators, dispatch)
});

export const ProfilePage = withRouter(
  connect(
    mapStateToProps,
    mapActionsToProps
  )(DisconnectedProfilePage)
);
