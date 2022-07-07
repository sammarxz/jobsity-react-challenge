import PropTypes from "prop-types";

function Avatar({ name, size }) {
  return (
    <nav>
      <div
        className={`w-${size} h-${size} rounded-full bg-blue-100 text-blue-500 flex items-center justify-center`}
      >
        {name.split("")[0]}
      </div>
    </nav>
  );
}

Avatar.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.number,
};

Avatar.defaultProps = {
  size: 8,
};

export { Avatar };
