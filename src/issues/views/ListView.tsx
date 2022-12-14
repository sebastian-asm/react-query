import { useState } from 'react';

import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';
import { State } from '../interfaces';
import { useIssues } from '../hooks';
import LoadingIcon from '../components/shared/LoadingIcon';

export const ListView = () => {
  const [selectedLabels, setSeletedLabels] = useState<string[]>([]);
  const [state, setState] = useState<State>();

  const { issuesQuery, page, nextPage, prevPage } = useIssues({
    state,
    labels: selectedLabels,
  });

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
          <IssueList
            issues={issuesQuery.data || []}
            state={state}
            onStateChanged={(newState) => setState(newState)}
          />
        )}

        <div className="d-flex mt-3 justify-content-between align-items-center">
          <button
            className="btn btn-outline-success"
            onClick={() => prevPage()}
            disabled={issuesQuery.isFetching}
          >
            Prev
          </button>

          <span>{page}</span>

          <button
            className="btn btn-outline-success"
            onClick={() => nextPage()}
            disabled={issuesQuery.isFetching}
          >
            Next
          </button>
        </div>
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
