import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';
import { useIssues } from '../hooks';
import { useState } from 'react';
import LoadingIcon from '../components/shared/LoadingIcon';

export const ListView = () => {
  const { issuesQuery } = useIssues();
  const [selectedLabels, setSeletedLabels] = useState<string[]>([]);

  const onLabelChanged = (labelName: string) => {
    selectedLabels?.includes(labelName)
      ? setSeletedLabels(selectedLabels.filter((label) => label !== labelName))
      : setSeletedLabels([...selectedLabels, labelName]);
  };

  return (
    <div className="row mt-5">
      <div className="col-8">
        {issuesQuery.isLoading ? (
          <LoadingIcon />
        ) : (
          <IssueList issues={issuesQuery.data || []} />
        )}
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
