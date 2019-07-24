import React from 'react';
import { getValidation, validateRequired } from '../utility';
import { Button, Form, FormValidation, Label, StarRating, TextArea } from '.';
import { User } from '../../../common';

export interface ReviewEditorProps {
  errors: string[];
  loading: boolean;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onRate: (star: number) => void;
  onSubmit: () => void;
  rating: number;
  review: string;
  submit: boolean;
  user?: User;
}

export const ReviewEditor: React.FC<ReviewEditorProps> = ({
  errors,
  loading,
  onChange,
  onRate,
  onSubmit,
  rating,
  review,
  submit,
  user
}) => (
  <Form classes="review-editor" onSubmit={onSubmit}>
    <Label htmlFor="review">
      <FormValidation
        submit={submit}
        {...getValidation(validateRequired(review), submit)}
      >
        <p className="review-editor__review">Review</p>
        <FormValidation submit={submit} errors={errors} valid={false} />
        {errors && errors.length > 0 && <br />}
        <TextArea
          classes="review-editor__input"
          id="review"
          placeholder="Write a review..."
          rows={5}
          defaultValue={review}
          onChange={onChange}
        />
      </FormValidation>
    </Label>
    <div className="review-editor__footer">
      <Label>
        <span className="review-editor__rate">
          Rate&nbsp;&nbsp;
          <StarRating
            rating={0}
            myRating={rating}
            onClick={onRate}
            user={user}
          />
        </span>
      </Label>
      <Button type="submit" disabled={loading} size="sm">
        Submit
      </Button>
    </div>
  </Form>
);
