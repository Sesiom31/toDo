import PropTypes from 'prop-types';

function BtnIcon({ icon: Icon, onClick, className, classNameIcon }) {
  return (
    <button
      className={`${className} w-6 h-6 p-0.5 flex justify-center items-center `}
      onClick={onClick}
    >
      <Icon
        className={`${classNameIcon} h-full w-full bg-transparen aspect-square`}
      />
    </button>
  );
}

BtnIcon.propTypes = {
  icon: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
  classNameIcon: PropTypes.string,
};

export default BtnIcon;
