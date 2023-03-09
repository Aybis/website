type Props = {
  label: string;
  description: string;
  dataBox: any[];
  defaultChecked: any;
  onChange: (value: any) => void;
};

export default function Checkbox({
  label,
  description,
  dataBox,
  defaultChecked,
  onChange,
}: Props) {
  return (
    <div>
      <label className="text-base font-semibold text-gray-900 mt-4">
        {label}
      </label>

      <p className="text-sm text-gray-500">{description}</p>
      <fieldset className="mt-2">
        <legend className="sr-only">List Checkbox</legend>
        <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
          {dataBox.map((item) => (
            <div key={item.id} className="flex items-center">
              <input
                id={item.id}
                name={item.id}
                type="radio"
                onChange={() => {
                  onChange(item);
                }}
                checked={item.id === defaultChecked.id}
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
              <label
                htmlFor={item.id}
                className="ml-3 block text-sm font-medium leading-6 text-gray-900">
                {item.value}
              </label>
            </div>
          ))}
        </div>
      </fieldset>
    </div>
  );
}
