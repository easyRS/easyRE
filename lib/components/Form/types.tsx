import { UseFormReturn } from 'react-hook-form';

export type FormProps = {
  formFields: ModelKeys;
  successRedirect: string;
  editObj?: IEntity;
  form?: UseFormReturn;
  onSubmit?: (data: IEntity) => void;
  submitTitle?: string;
  canDelete: boolean;
  callbacks: {
    createCallback: (data: IEntity) => void;
    updateCallback: (data: IEntity) => void;
    deleteCallback: (data: IEntity) => void;
  };
};
