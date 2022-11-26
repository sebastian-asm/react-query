import { useState } from 'react';

import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';
import { State } from '../interfaces';
import { useIssuesInfinite } from '../hooks';
import LoadingIcon from '../components/shared/LoadingIcon';

export const ListViewInfinite = () => {
  const [selectedLabels, setSeletedLabels] = useState<string[]>([]);
  const [state, setState] = useState<State>();

  const { issuesQuery } = useIssuesInfinite({
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
            // con flat se puede "aplanar" un array de array
            issues={issuesQuery.data?.pages.flat() || []}
            state={state}
            onStateChanged={(newState) => setState(newState)}
          />
        )}

        <button
          onClick={() => issuesQuery.fetchNextPage()}
          // bloqueado en caso de no haber una siguiente pagina
          disabled={!issuesQuery.hasNextPage}
          className="btn btn-outline-success mt-3"
        >
          Load more...
        </button>
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
