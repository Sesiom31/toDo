import PropTypes from 'prop-types';

function BtnIcon({ icon: Icon, onClick, className }) {
  return (
    <button className={`${className} w-6 h-6 p-0.5 flex justify-center items-center `} onClick={onClick}>
      <Icon className=" h-full w-full bg-transparent" />
    </button>
  );
}

BtnIcon.propTypes = {
  icon: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default BtnIcon;
