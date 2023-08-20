import { CloseIcon } from '@/components/icons/close-icon';
import { SearchIcon } from '@/components/icons/search-icon';
import cn from 'classnames';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'next-i18next';

const classes = {
  root: 'ps-10 pe-4 h-12 flex items-center w-full rounded appearance-none transition duration-300 ease-in-out text-heading text-sm focus:outline-none focus:ring-0',
  normal:
    'bg-gray-100 border border-border-base focus:shadow focus:bg-light focus:border-accent',
  solid:
    'bg-gray-100 border border-border-100 focus:bg-light focus:border-accent',
  outline: 'border border-border-base focus:border-accent',
  shadow: 'focus:shadow',
};

type SearchProps = {
  className?: string;
  shadow?: boolean;
  variant?: 'normal' | 'solid' | 'outline';
  inputClassName?: string;
  onChange: (data: SearchValue) => void;
};

type SearchValue = {
  searchText: string;
};

// ... (imports and type definitions)

const Search: React.FC<SearchProps> = ({
  className,
  onChange,
  variant = 'outline',
  shadow = false,
  inputClassName,
  ...rest
}) => {
  const {
    register,
    watch,

    formState: { errors },
  } = useForm<SearchValue>({
    defaultValues: {
      searchText: '',
    },
  });
  const searchText = watch('searchText');
  const { t } = useTranslation();

  const rootClassName = cn(
    classes.root,
    {
      [classes.normal]: variant === 'normal',
      [classes.solid]: variant === 'solid',
      [classes.outline]: variant === 'outline',
    },
    {
      [classes.shadow]: shadow,
    },
    inputClassName
  );

  return (
    <form
      noValidate
      role="search"
      className={cn('relative flex w-full items-center', className)}
    >
      <label htmlFor="search" className="sr-only">
        {t('form:input-label-search')}
      </label>
      <button className="start-1 absolute p-2 text-body outline-none focus:outline-none active:outline-none">
        <SearchIcon className="h-5 w-5" />
      </button>
      <input
        type="text"
        id="search"
        {...register('searchText')}
        className={rootClassName}
        placeholder={t('form:input-placeholder-search')}
        aria-label="Search"
        autoComplete="off"
        onChange={(event) => {
          const value = event.target.value;
          onChange({ searchText: value }); // Call the provided onChange event handler
        }}
        {...rest}
      />
      {errors.searchText && <p>{errors.searchText.message}</p>}
      {!!searchText && (
        <button
          type="button"
          onClick={() => onChange({ searchText: '' })} // Call the provided onChange event handler
          className="end-1 absolute p-2 text-body outline-none focus:outline-none active:outline-none"
        >
          <CloseIcon className="h-5 w-5" />
        </button>
      )}
    </form>
  );
};

export default Search;

