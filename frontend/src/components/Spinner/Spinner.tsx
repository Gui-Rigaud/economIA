import React from 'react';
import './Spinner2.css';

const Spinner: React.FC = () => (
  <div className="lds-roller">
    {Array.from({ length: 8 }).map((_, index) => (
      <div key={index}></div>
    ))}
  </div>
);

export default Spinner;
