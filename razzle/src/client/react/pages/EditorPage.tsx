import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { ContentType, Genre, MPA, Season } from '../../../common';
import {
  Button,
  Container,
  Form,
  FormValidation,
  Label,
  Layout,
  NumberInput,
  SelectInput,
  TextInput,
  TextArea
} from '../components';
import { routes } from '../routes';
import { getValidation, isValid, validateRequired } from '../utility';

export interface EditorContent {
  actors: string[];
  director: string;
  duration: number;
  endYear?: number;
  image: string;
  genres: Genre[];
  mpa: MPA;
  network?: string;
  seasons?: Season[];
  synopsis: string;
  title: string;
  year: number;
  type: ContentType;
}

export interface EditorPageProps extends RouteComponentProps<{ id?: string }> {
  // addContent: (user: EditorContent) => void;
  // editContent: (user: EditorContent) => void;
}

export const DisconnectedEditorPage: React.FC<EditorPageProps> = ({
  history,
  match: { params }
}) => {
  const [errors, setErrors] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [submit, setSubmit] = React.useState(false);
  const [editorContent, setEditorContent] = React.useState<EditorContent>({
    actors: [],
    director: '',
    duration: 0,
    // endYear?: number,
    image: '',
    genres: [],
    mpa: 'G',
    // network?: '',
    // seasons?: [],
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
  };

  const isValidForm = () => {
    const {
      actors,
      director,
      duration,
      genres,
      mpa,
      network,
      seasons,
      synopsis,
      title,
      year
    } = editorContent;
    return (
      isValid(validateRequired(actors)) &&
      isValid(validateRequired(director)) &&
      isValid(validateRequired(duration)) &&
      isValid(validateRequired(genres)) &&
      isValid(validateRequired(mpa)) &&
      // isValid(validateRequired(network)) &&
      // isValid(validateRequired(seasons)) &&
      isValid(validateRequired(synopsis)) &&
      isValid(validateRequired(title)) &&
      isValid(validateRequired(year))
    );
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    field: keyof EditorContent
  ) => {
    const value: string = e.target.value;
    setEditorContent({
      ...editorContent,
      [field]: value && value.trim()
    });
    resetForm();
  };

  const handleSubmit = async () => {
    try {
      setSubmit(true);
      if (isValidForm()) {
        setLoading(true);
        console.log('Valid', editorContent);
        // @TODO: Dispatch redux action
        // await registerUser({ ...editorContent, role });
        history.push(routes.home.path);
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

  return (
    <Layout>
      <Container>
        <Form classes="editor-page__form" onSubmit={handleSubmit}>
          <h1 className="form__title">Content Editor</h1>
          <Container>
            <div className="editor-page__row">
              <FormValidation submit={submit} errors={errors} valid={false} />
              <Label htmlFor="title">
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
              <Label htmlFor="type">
                <FormValidation
                  submit={submit}
                  {...getValidation(
                    validateRequired(editorContent.type),
                    submit
                  )}
                >
                  <p>Content Type</p>
                  <div className="editor-page__input">
                    <Button
                      id="movie-type"
                      type="button"
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
                      onClick={() =>
                        setEditorContent({ ...editorContent, type: 'Series' })
                      }
                    >
                      <i className="fas fa-tv" />
                      <p>TV Show</p>
                    </Button>
                  </div>
                </FormValidation>
              </Label>
            </div>
            <div className="editor-page__row">
              <Label htmlFor="synopsis">
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
              <Label htmlFor="image">
                <p>Image</p>
                <TextInput
                  classes="editor-page__input"
                  id="image"
                  value={editorContent.title}
                  onChange={e => handleChange(e, 'image')}
                />
              </Label>
            </div>
            <div className="editor-page__row">
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
              {/* @TODO: Add genres multiselect */}
            </div>
            <div className="editor-page__row">
              <Label htmlFor="year">
                <FormValidation
                  submit={submit}
                  {...getValidation(
                    validateRequired(editorContent.year),
                    submit
                  )}
                >
                  <p>Year</p>
                  <NumberInput
                    id="year"
                    value={editorContent.year}
                    onChange={e => handleChange(e, 'year')}
                  />
                </FormValidation>
              </Label>
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
              <Label htmlFor="mpa">
                <FormValidation
                  submit={submit}
                  {...getValidation(
                    validateRequired(editorContent.mpa),
                    submit
                  )}
                >
                  <p>MPA Rating</p>
                  <SelectInput
                    id="mpa"
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
                      value={editorContent.network}
                      onChange={e => handleChange(e, 'network')}
                    />
                  </FormValidation>
                </Label>
              )}
            </div>
            <div className="editor-page__row">
              {editorContent.type === 'Series' && (
                <Button type="button" size="sm">
                  <i className="fas fa-plus" />
                  &nbsp;&nbsp;Add Seasons
                </Button>
              )}
            </div>
          </Container>
          <Button type="submit" disabled={loading}>
            Submit
          </Button>
        </Form>
      </Container>
    </Layout>
  );
};

// const actionCreators = {
//   registerUser: (user: EditorContent) => userState.register(user)
// };

// const mapActionsToProps = (dispatch: Dispatch) => ({
//   ...bindActionCreators(actionCreators, dispatch)
// });

export const EditorPage = withRouter(DisconnectedEditorPage);
