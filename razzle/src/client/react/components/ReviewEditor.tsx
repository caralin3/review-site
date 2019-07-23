import React from 'react';
import { getValidation, validateRequired } from '../utility';
import { Button, Form, FormValidation, Label, StarRating, TextArea } from '.';

export interface ReviewEditorProps {
  errors: string[];
  loading: boolean;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onRate: (star: number) => void;
  onSubmit: () => void;
  rating: number;
  review: string;
  submit: boolean;
}

export const ReviewEditor: React.FC<ReviewEditorProps> = ({
  errors,
  loading,
  onChange,
  onRate,
  onSubmit,
  rating,
  review,
  submit
}) => (
  <Form classes="review-editor" onSubmit={onSubmit}>
    <FormValidation submit={submit} errors={errors} valid={false} />
    <Label>
      <FormValidation
        submit={submit}
        {...getValidation(validateRequired(rating), submit)}
      >
        <span className="review-editor__rate">
          <p>Rate</p>&nbsp;&nbsp;
          <StarRating rating={0} myRating={rating} onClick={onRate} />
        </span>
      </FormValidation>
    </Label>
    <Label htmlFor="review">
      <FormValidation
        submit={submit}
        {...getValidation(validateRequired(review), submit)}
      >
        <p>Review</p>
        <TextArea
          id="review"
          rows={5}
          defaultValue={review}
          onChange={onChange}
        />
      </FormValidation>
    </Label>
    <Button type="submit" disabled={loading}>
      Submit
    </Button>
  </Form>
);
