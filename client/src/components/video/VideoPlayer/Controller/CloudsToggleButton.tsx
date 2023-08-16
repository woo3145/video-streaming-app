import { BsCloudSlash } from 'react-icons/bs';
import { setCloudsIsVisible } from 'store/modules/cloudSlice';
import { useAppDispatch, useAppSelector } from 'store/store';

const CloudsToggleButton = () => {
  const dispatch = useAppDispatch();
  const { isVisible } = useAppSelector((state) => state.clouds);

  const onClickHandler = () => {
    dispatch(setCloudsIsVisible(!isVisible));
  };
  return (
    <div
      onClick={onClickHandler}
      className="flex items-center justify-center w-8 h-8 rounded-md text-xl cursor-pointer duration-300 hover:bg-accent hover:text-accent-foreground"
    >
      {isVisible ? <span>☁️</span> : <BsCloudSlash />}
    </div>
  );
};

export default CloudsToggleButton;
