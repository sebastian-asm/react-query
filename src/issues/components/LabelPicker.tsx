import { FC } from 'react';
import { useLabels } from '../hooks';
import LoadingIcon from './shared/LoadingIcon';

interface Props {
  selectedLabels: string[];
  onChange: (labelName: string) => void;
}

export const LabelPicker: FC<Props> = ({ selectedLabels, onChange }) => {
  const labelsQuery = useLabels();

  // isLoading es ideal para cuando es la primera vez que se obtienen datos
  // que ni aun existen en cache
  if (labelsQuery.isLoading) return <LoadingIcon />;

  return (
    <>
      {labelsQuery.data?.map((label) => (
        <span
          key={label.id}
          onClick={() => onChange(label.name)}
          className={`${
            selectedLabels.includes(label.name) ? 'label-active' : ''
          } badge rounded-pill m-1 label-picker`}
          style={{
            border: `1px solid #${label.color}`,
            color: `#${label.color}`,
          }}
        >
          {label.name}
        </span>
      ))}
    </>
  );
};
