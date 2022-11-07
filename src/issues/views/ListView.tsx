import { useState } from 'react';
import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';

export const ListView = () => {
  const [selectedLabels, setSeletedLabels] = useState<string[]>([]);

  const onLabelChanged = (labelName: string) => {
    selectedLabels?.includes(labelName)
      ? setSeletedLabels(selectedLabels.filter((label) => label !== labelName))
      : setSeletedLabels([...selectedLabels, labelName]);
  };

  return (
    <div className="row mt-5">
      <div className="col-8">
        <IssueList />
      </div>

      <div className="col-4">
        <LabelPicker
          selectedLabels={selectedLabels}
          onChange={onLabelChanged}
        />
      </div>
    </div>
  );
};
