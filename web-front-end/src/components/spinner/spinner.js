import 'element-theme-default';



const Spinner = () => {

  const loadingStyle = {
    fontSize: '50px',
    color : 'red'
  }

  return (
      <i className="el-icon-loading" style ={loadingStyle}>  </i>
  );
};

export default Spinner;
