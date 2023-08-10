const StaticLogin = () => {
  console.log('StaticLogin component is mounting.');

  useEffect(() => {
    console.log('Effect in StaticLogin component is triggered.');
  }, []);

  return (
    <div>
      Hello World
      {console.log('Rendering is complete.')}
    </div>
  );
};