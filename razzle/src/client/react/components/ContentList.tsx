import React from 'react';
import { ContentType, MultipleContentResponse, User } from '../../../common';
import {
  Banner,
  Container,
  ContentPreviewList,
  Tab,
  TabList,
  TabPanel
} from '../components';

export interface ContentListProps {
  content: MultipleContentResponse;
  handleRating: (value: number, id: string, rated: boolean) => void;
  handleWatch: (watching: boolean, id: string) => void;
  type: ContentType;
  user?: User;
}

export const ContentList: React.FC<ContentListProps> = ({
  content,
  handleRating,
  handleWatch,
  type,
  user
}) => {
  const [tab, setTab] = React.useState<'movie' | 'show' | 'watch'>('movie');
  const watchTab = React.useRef(null);
  const movieTab = React.useRef(null);
  const showTab = React.useRef(null);

  React.useEffect(() => {
    if (user) {
      setTab('watch');
    } else {
      if (type === 'Series') {
        setTab('show');
      }
    }
  }, [type]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.keyCode === 37 || e.keyCode === 39) {
      if (document.activeElement && document.activeElement.id === 'watch') {
        if (type === 'Movie') {
          if (movieTab && movieTab.current) {
            (movieTab.current as any).focus();
          }
        } else {
          if (showTab && showTab.current) {
            (showTab.current as any).focus();
          }
        }
      } else if (
        document.activeElement &&
        document.activeElement.id === 'movie'
      ) {
        if (watchTab && watchTab.current) {
          (watchTab.current as any).focus();
        }
      } else if (
        document.activeElement &&
        document.activeElement.id === 'show'
      ) {
        if (watchTab && watchTab.current) {
          (watchTab.current as any).focus();
        }
      }
    }
  };

  return (
    <>
      <Banner>
        <i className="fas fa-film banner__icon" />
        <h1 className="banner__brand">Featured</h1>
      </Banner>
      <Container>
        <TabList>
          {user && (
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
          )}
          {type === 'Movie' && (
            <Tab
              id="movie"
              innerRef={movieTab}
              panelId="movie-panel"
              selected={tab}
              onClick={() => setTab('movie')}
              onKeyDown={handleKeyDown}
            >
              Movies
            </Tab>
          )}
          {type === 'Series' && (
            <Tab
              id="show"
              innerRef={showTab}
              panelId="show-panel"
              selected={tab}
              onClick={() => setTab('show')}
              onKeyDown={handleKeyDown}
            >
              TV Shows
            </Tab>
          )}
        </TabList>
        {user && (
          <TabPanel selected={tab} id="watch-list" tabId="watch">
            <ContentPreviewList
              contentList={content.allContent.filter(
                con => con.watchList && con.type === type
              )}
              handleRating={handleRating}
              handleWatch={handleWatch}
              user={user}
            />
          </TabPanel>
        )}
        {type === 'Movie' && (
          <TabPanel selected={tab} id="movie-panel" tabId="movie">
            <ContentPreviewList
              contentList={content.allContent.filter(
                con => con.type === 'Movie'
              )}
              handleRating={handleRating}
              handleWatch={handleWatch}
              user={user}
            />
          </TabPanel>
        )}
        {type === 'Series' && (
          <TabPanel selected={tab} id="show-panel" tabId="show">
            <ContentPreviewList
              contentList={content.allContent.filter(
                con => con.type === 'Series'
              )}
              handleRating={handleRating}
              handleWatch={handleWatch}
              user={user}
            />
          </TabPanel>
        )}
      </Container>
    </>
  );
};
