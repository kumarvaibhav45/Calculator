import React from 'react';
import Button from '../Button';

const Layout = ({ inputValue, inputArray, handleButtonInput }) => {
  return (
    <div id='outer-cover'>
      <div id='display-wrapper'>
        <div id='saved-input'>
          {inputArray.map((item, index) => (
            <span key={index}>{item}</span>
          ))}
        </div>
        <div id='display'>{inputValue}</div>
      </div>
      <div id='dial-panel'>
        <div className='row'>
          <Button
            btn={'C'}
            handleButtonInput={handleButtonInput}
            id={'clear'}
          />
          <Button
            btn={'d'}
            handleButtonInput={handleButtonInput}
            id={'delete'}
          />
          <Button
            btn={'%'}
            handleButtonInput={handleButtonInput}
            id={'percentage'}
          />
          <Button
            btn={'/'}
            handleButtonInput={handleButtonInput}
            id={'divide'}
          />
        </div>
        <div className='row'>
          <Button
            btn={'7'}
            handleButtonInput={handleButtonInput}
            id={'seven'}
          />
          <Button
            btn={'8'}
            handleButtonInput={handleButtonInput}
            id={'eight'}
          />
          <Button btn={'9'} handleButtonInput={handleButtonInput} id={'nine'} />
          <Button
            btn={'*'}
            handleButtonInput={handleButtonInput}
            id={'multiply'}
          />
        </div>
        <div className='row'>
          <Button btn={'4'} handleButtonInput={handleButtonInput} id={'four'} />
          <Button btn={'5'} handleButtonInput={handleButtonInput} id={'five'} />
          <Button btn={'6'} handleButtonInput={handleButtonInput} id={'six'} />
          <Button
            btn={'-'}
            handleButtonInput={handleButtonInput}
            id={'subtract'}
          />
        </div>
        <div className='row'>
          <Button btn={'1'} handleButtonInput={handleButtonInput} id={'one'} />
          <Button btn={'2'} handleButtonInput={handleButtonInput} id={'two'} />
          <Button
            btn={'3'}
            handleButtonInput={handleButtonInput}
            id={'three'}
          />
          <Button btn={'+'} handleButtonInput={handleButtonInput} id={'add'} />
        </div>
        <div className='row'>
          <Button
            btn={'.'}
            handleButtonInput={handleButtonInput}
            id={'decimal'}
          />
          <Button btn={'0'} handleButtonInput={handleButtonInput} id={'zero'} />
          <Button
            btn={'='}
            handleButtonInput={handleButtonInput}
            id={'equals'}
          />
        </div>
      </div>
    </div>
  );
};

export default Layout;
