// create Loading spinner from DaisyUi
const LoadingSpinner = ({ size = "md" }) => {
  // Medium size by default
  const sizeClass = `loading-${size}`;

  // return element
  return <span className={`loading loading-spinner ${sizeClass}`} />;
};

// export component
export default LoadingSpinner;
