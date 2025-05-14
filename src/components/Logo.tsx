import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center h-16">
      <img 
        src="/logo.png" 
        alt="MultiDrop Logo" 
        className="h-12 object-contain" 
        style={{ maxWidth: '100%' }}
      />
    </div>
  );
};

export default Logo;
