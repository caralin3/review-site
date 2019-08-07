import classNames from 'classnames';
import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { bindActionCreators, Dispatch } from 'redux';
import { Genre, Episode, NewContent, User } from '../../../common';
import {
  Button,
  Checkbox,
  Container,
  DateInput,
  EpisodeItem,
  Form,
  FormValidation,
  Label,
  NumberInput,
  SelectInput,
  TextArea,
  TextInput
} from '../components';
import { ApplicationState } from '../store';
import { getValidation, isValid, validateRequired } from '../utility';

export interface EditorEpisode {
  date: string;
  duration: number;
  num: number;
  season: number;
  synopsis: string;
  title: string;
}

export interface EditorPageProps extends RouteComponentProps<{ id?: string }> {
  // addContent: (user: EditorContent) => void;
  // updateContent: (user: EditorContent) => void;
  user?: User;
}

export const DisconnectedEditorPage: React.FC<EditorPageProps> = ({
  history,
  match: { params },
  user
}) => {
  const [errors, setErrors] = React.useState<string[]>([]);
  const [episodeErrors, setEpisodeErrors] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [submit, setSubmit] = React.useState(false);
  const [submitEp, setSubmitEp] = React.useState(false);
  const [addingEps, setAddingEps] = React.useState(true);
  const [episodes, setEpisodes] = React.useState<EditorEpisode[]>([]);
  const [episode, setEpisode] = React.useState<EditorEpisode>({
    date: '',
    duration: 0,
    num: 0,
    season: 0,
    synopsis: '',
    title: ''
  });
  const [editorContent, setEditorContent] = React.useState<NewContent>({
    actors: [],
    director: '',
    duration: 0,
    endYear: 0,
    image: '',
    genres: [],
    mpa: 'G',
    network: '',
    synopsis: '',
    title: '',
    year: 0,
    type: 'Series'
  });

  React.useEffect(() => {
    if (params && params.id) {
    }
  }, [params]);

  const resetForm = () => {
    setErrors([]);
    setLoading(false);
    setSubmit(false);
    setSubmitEp(false);
  };

  const isValidForm = () => {
    const {
      actors,
      director,
      duration,
      genres,
      mpa,
      network,
      synopsis,
      title,
      type,
      year
    } = editorContent;

    const baseFormValid =
      isValid(validateRequired(actors)) &&
      isValid(validateRequired(director)) &&
      isValid(validateRequired(duration)) &&
      isValid(validateRequired(genres)) &&
      isValid(validateRequired(mpa)) &&
      isValid(validateRequired(synopsis)) &&
      isValid(validateRequired(title)) &&
      isValid(validateRequired(year));

    if (type === 'Movie') {
      return baseFormValid;
    }

    if (!isValid(validateRequired(episodes))) {
      setEpisodeErrors(['Must submit episodes']);
    }

    return (
      baseFormValid &&
      isValid(validateRequired(network)) &&
      isValid(validateRequired(episodes))
    );
  };

  const isValidEpisode = () => {
    const { date, duration, season, synopsis, title } = episode;
    return (
      isValid(validateRequired(date)) &&
      isValid(validateRequired(duration)) &&
      isValid(validateRequired(season)) &&
      isValid(validateRequired(synopsis)) &&
      isValid(validateRequired(title))
    );
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    field: keyof NewContent
  ) => {
    const value: string = e.target.value;
    setEditorContent({
      ...editorContent,
      [field]: value
    });
    resetForm();
  };

  const handleEpisodeChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    field: keyof Episode
  ) => {
    const value: string = e.target.value;
    setEpisode({
      ...episode,
      [field]: value
    });
    resetForm();
  };

  // @TODO: Delete episode

  const handleAddEpisode = async () => {
    setSubmitEp(true);
    if (isValidEpisode()) {
      setEpisodes([...episodes, episode]);
      setEpisode({
        date: '',
        duration: 0,
        num: 0,
        season: 0,
        synopsis: '',
        title: ''
      });
      resetForm();
      setAddingEps(false);
    }
  };

  const handleChecked = (value: Genre) => {
    resetForm();
    if (editorContent.genres.includes(value)) {
      setEditorContent({
        ...editorContent,
        genres: editorContent.genres.filter(genre => genre !== value) || []
      });
    } else {
      setEditorContent({
        ...editorContent,
        genres: [...editorContent.genres, value]
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>, value: Genre) => {
    if (e.keyCode === 13) {
      handleChecked(value);
    }
  };

  const handleSubmit = async () => {
    try {
      setSubmit(true);
      if (isValidForm()) {
        setLoading(true);
        console.log('Valid', editorContent, episodes);

        if (params && params.id) {
          // @TODO: Dispatch redux action
          // await addEpisode(episode);
          // await updateContent({ ...editorContent, role });
          history.goBack();
          return;
        }

        // @TODO: Dispatch redux action
        // await addEpisode(episode);
        // @TODO: Dispatch redux action
        // await addContent({ ...editorContent, role });
        history.goBack();
      }
    } catch (err) {
      console.error(err);
      if (err.response) {
        const apiErrors = err.response.data.errors;
        const formErrors: string[] = [];
        Object.keys(apiErrors).forEach(key => {
          if (apiErrors) {
            formErrors.push(`${key} ${apiErrors[key]}`);
          }
        });
        setErrors(formErrors);
      }
    }
    setLoading(false);
  };

  const movieMpaOptions = [
    { label: 'G', value: 'G' },
    { label: 'PG', value: 'PG' },
    { label: 'PG-13', value: 'PG-13' },
    { label: 'R', value: 'R' }
  ];

  const tvMpaOptions = [
    { label: 'G', value: 'G' },
    { label: 'PG', value: 'PG' },
    { label: 'TV-14', value: 'TV-14' },
    { label: 'TV-MA', value: 'TV-MA' }
  ];

  const genres: Genre[] = [
    'Action',
    'Comedy',
    'Drama',
    'Family',
    'Horror',
    'Musical',
    'Romance',
    'Thriller'
  ];

  return (
    <Container>
      <Form classes="editor-page__form" onSubmit={handleSubmit}>
        <h1 className="form__title">Content Editor</h1>
        <Container>
          <FormValidation submit={submit} errors={errors} valid={false} />
          <div className="editor-page__row">
            <Label htmlFor="type">
              <FormValidation
                submit={submit}
                {...getValidation(validateRequired(editorContent.type), submit)}
              >
                <p>Content Type</p>
                <div className="editor-page__row-buttons">
                  <div className="editor-page__input">
                    <Button
                      id="movie-type"
                      type="button"
                      selected={editorContent.type === 'Movie'}
                      onClick={() =>
                        setEditorContent({ ...editorContent, type: 'Movie' })
                      }
                    >
                      <i className="fas fa-video" />
                      <p>Movie</p>
                    </Button>
                    <Button
                      id="tv-type"
                      type="button"
                      selected={editorContent.type === 'Series'}
                      onClick={() =>
                        setEditorContent({ ...editorContent, type: 'Series' })
                      }
                    >
                      <i className="fas fa-tv" />
                      <p>TV Show</p>
                    </Button>
                  </div>
                </div>
              </FormValidation>
            </Label>
            <div className="editor-page__row-around">
              <Label htmlFor="year">
                <FormValidation
                  submit={submit}
                  {...getValidation(
                    validateRequired(editorContent.year),
                    submit
                  )}
                >
                  <p>{editorContent.type === 'Movie' ? 'Year' : 'Start Year'}</p>
                  <NumberInput
                    id="year"
                    value={editorContent.year}
                    onChange={e => handleChange(e, 'year')}
                  />
                </FormValidation>
              </Label>
              {editorContent.type === 'Series' && (
                <Label htmlFor="end-ear">
                  <FormValidation
                    submit={false}
                    {...getValidation(
                      validateRequired(editorContent.endYear),
                      submit
                    )}
                  >
                    <p>End Year</p>
                    <NumberInput
                      id="end-year"
                      value={editorContent.endYear}
                      onChange={e => handleChange(e, 'endYear')}
                    />
                  </FormValidation>
                </Label>
              )}
              <Label htmlFor="duration">
                <FormValidation
                  submit={submit}
                  {...getValidation(
                    validateRequired(editorContent.duration),
                    submit
                  )}
                >
                  <p>Duration</p>
                  <NumberInput
                    id="duration"
                    value={editorContent.duration}
                    onChange={e => handleChange(e, 'duration')}
                  />
                </FormValidation>
              </Label>
            </div>
          </div>
          <div className="editor-page__row">
            <div className="editor-page__col">
              <Label htmlFor="title" classes="editor-page__label-left">
                <FormValidation
                  submit={submit}
                  {...getValidation(
                    validateRequired(editorContent.title),
                    submit
                  )}
                >
                  <p>Title</p>
                  <TextInput
                    classes="editor-page__input"
                    id="title"
                    value={editorContent.title}
                    onChange={e => handleChange(e, 'title')}
                  />
                </FormValidation>
              </Label>
              <Label htmlFor="synopsis" classes="editor-page__label-left">
                <FormValidation
                  submit={submit}
                  {...getValidation(
                    validateRequired(editorContent.synopsis),
                    submit
                  )}
                >
                  <p>Synopsis</p>
                  <TextArea
                    classes="editor-page__input"
                    id="synopsis"
                    maxLength={300}
                    value={editorContent.synopsis}
                    onChange={e => handleChange(e, 'synopsis')}
                  />
                </FormValidation>
              </Label>
              <Label htmlFor="image" classes="editor-page__label-left">
                <p>Image</p>
                <TextInput
                  classes="editor-page__input"
                  id="image"
                  value={editorContent.image}
                  onChange={e => handleChange(e, 'image')}
                />
              </Label>
            </div>
            <div className="editor-page__col">
              <Label htmlFor="director">
                <FormValidation
                  submit={submit}
                  {...getValidation(
                    validateRequired(editorContent.director),
                    submit
                  )}
                >
                  <p>
                    {editorContent.type === 'Movie' ? 'Director' : 'Creator'}
                  </p>
                  <TextInput
                    classes="editor-page__input"
                    id="director"
                    value={editorContent.director}
                    onChange={e => handleChange(e, 'director')}
                  />
                </FormValidation>
              </Label>
              <Label htmlFor="actors">
                <FormValidation
                  submit={submit}
                  {...getValidation(
                    validateRequired(editorContent.actors),
                    submit
                  )}
                >
                  <p>Actors</p>
                  <TextInput
                    classes="editor-page__input"
                    id="actors"
                    value={editorContent.actors}
                    onChange={e => handleChange(e, 'actors')}
                  />
                </FormValidation>
              </Label>
              <p className="editor-page__fieldset-title">Genres</p>
              <FormValidation
                submit={submit}
                {...getValidation(
                  validateRequired(editorContent.genres),
                  submit
                )}
              >
                <div className="editor-page__fieldset" role="group">
                  {genres.map(genre => (
                    <Label
                      classes="editor-page__checkbox-label"
                      id={`${genre}-label`}
                      htmlFor={genre}
                      key={genre}
                    >
                      <i
                        className={classNames({
                          'editor-page__checkbox': true,
                          'editor-page__checkbox--checked': editorContent.genres.includes(
                            genre
                          ),
                          'fas fa-check-square': editorContent.genres.includes(
                            genre
                          ),
                          'far fa-square': !editorContent.genres.includes(genre)
                        })}
                        role="checkbox"
                        aria-labelledby={`${genre}-label`}
                        tabIndex={0}
                        onKeyDown={e => handleKeyDown(e, genre)}
                      />
                      {genre}
                      <Checkbox
                        className="editor-page__checkInput"
                        id={genre}
                        tabIndex={-1}
                        aria-checked={editorContent.genres.includes(genre)}
                        aria-labelledby={`${genre}-label`}
                        checked={editorContent.genres.includes(genre)}
                        onChange={() => handleChecked(genre)}
                      />
                    </Label>
                  ))}
                </div>
              </FormValidation>
            </div>
          </div>
          <div className="editor-page__row">
            <Label htmlFor="mpa">
              <FormValidation
                submit={submit}
                {...getValidation(validateRequired(editorContent.mpa), submit)}
              >
                <p>MPA Rating</p>
                <SelectInput
                  id="mpa"
                  classes="editor-page__input"
                  options={
                    editorContent.type === 'Movie'
                      ? movieMpaOptions
                      : tvMpaOptions
                  }
                  value={editorContent.mpa}
                  onChange={e => handleChange(e, 'mpa')}
                />
              </FormValidation>
            </Label>
            {editorContent.type === 'Series' && (
              <Label htmlFor="network">
                <FormValidation
                  submit={submit}
                  {...getValidation(
                    validateRequired(editorContent.network),
                    submit
                  )}
                >
                  <p>Network</p>
                  <TextInput
                    id="network"
                    classes="editor-page__input"
                    value={editorContent.network}
                    onChange={e => handleChange(e, 'network')}
                  />
                </FormValidation>
              </Label>
            )}
          </div>
          {editorContent.type === 'Series' && (
            <>
              <h2 className="editor-page__header">Episodes</h2>
              <section className="editor-page__section">
                <ul className="episode-item__list">
                  {episodes &&
                    episodes.length > 0 &&
                    episodes.map(ep => (
                      <li className="episode-item__list-item" key={ep.num}>
                        <EpisodeItem episode={{ ...ep, id: '' }} />
                      </li>
                    ))}
                </ul>
                {addingEps && (
                  <>
                    <FormValidation
                      submit={submit}
                      errors={episodeErrors}
                      valid={false}
                    />
                    <div className="editor-page__episode-container">
                      <Label htmlFor="season">
                        <FormValidation
                          submit={submitEp || submit}
                          {...getValidation(
                            validateRequired(episode.season),
                            submitEp || submit
                          )}
                        >
                          <p>Season Number</p>
                          <NumberInput
                            id="season"
                            value={episode.season}
                            onChange={e => handleEpisodeChange(e, 'season')}
                          />
                        </FormValidation>
                      </Label>
                      <Label htmlFor="num">
                        <FormValidation
                          submit={submitEp || submit}
                          {...getValidation(
                            validateRequired(episode.num),
                            submitEp || submit
                          )}
                        >
                          <p>Episode Number</p>
                          <NumberInput
                            id="num"
                            value={episode.num}
                            onChange={e => handleEpisodeChange(e, 'num')}
                          />
                        </FormValidation>
                      </Label>
                      <Label htmlFor="episode-duration">
                        <FormValidation
                          submit={submitEp || submit}
                          {...getValidation(
                            validateRequired(episode.duration),
                            submitEp || submit
                          )}
                        >
                          <p>Duration</p>
                          <NumberInput
                            id="episode-duration"
                            value={episode.duration}
                            onChange={e => handleEpisodeChange(e, 'duration')}
                          />
                          &nbsp;&nbsp;mins
                        </FormValidation>
                      </Label>
                      <Label htmlFor="episode-date">
                        <FormValidation
                          submit={submitEp || submit}
                          {...getValidation(
                            validateRequired(episode.date),
                            submitEp || submit
                          )}
                        >
                          <p>Air Date</p>
                          <DateInput
                            id="episode-date"
                            value={episode.date}
                            onChange={e => handleEpisodeChange(e, 'date')}
                          />
                        </FormValidation>
                      </Label>
                    </div>
                    <div className="editor-page__episode-container">
                      <Label htmlFor="episode-title">
                        <FormValidation
                          submit={submitEp || submit}
                          {...getValidation(
                            validateRequired(episode.title),
                            submitEp || submit
                          )}
                        >
                          <p>Title</p>
                          <TextInput
                            classes="editor-page__input"
                            id="episode-title"
                            value={episode.title}
                            onChange={e => handleEpisodeChange(e, 'title')}
                          />
                        </FormValidation>
                      </Label>
                      <Label htmlFor="episode-synopsis">
                        <FormValidation
                          submit={submitEp || submit}
                          {...getValidation(
                            validateRequired(episode.synopsis),
                            submitEp || submit
                          )}
                        >
                          <p>Synopsis</p>
                          <TextArea
                            classes="editor-page__input"
                            id="episode-synopsis"
                            maxLength={300}
                            value={episode.synopsis}
                            onChange={e => handleEpisodeChange(e, 'synopsis')}
                          />
                        </FormValidation>
                      </Label>
                    </div>
                    <div className="editor-page__buttons-add">
                      <Button
                        type="button"
                        size="sm"
                        onClick={handleAddEpisode}
                      >
                        Add Episode
                      </Button>
                    </div>
                  </>
                )}
              </section>
              <div className="editor-page__buttons-add">
                {!addingEps && editorContent.type === 'Series' && (
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => setAddingEps(true)}
                  >
                    <i className="fas fa-plus" />
                    &nbsp;&nbsp;Add Another Episode
                  </Button>
                )}
              </div>
            </>
          )}
        </Container>
        <Button type="submit" disabled={loading}>
          Submit
        </Button>
      </Form>
    </Container>
  );
};

const mapStateToProps = (state: ApplicationState) => ({
  user: state.User.response
});

// const actionCreators = {
//   registerUser: (user: EditorContent) => userState.register(user)
// };

// const mapActionsToProps = (dispatch: Dispatch) => ({
//   ...bindActionCreators(actionCreators, dispatch)
// });

export const EditorPage = withRouter(
  connect(mapStateToProps)(DisconnectedEditorPage)
);
