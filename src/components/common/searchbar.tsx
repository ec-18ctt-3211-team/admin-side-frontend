import { Input } from 'components/common';
import { InlineIcon, searchOutline } from 'utils/icon.utils';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

interface Props{
  path: string;
}

export default function Searchbar(props: Props): JSX.Element {
  const history = useHistory();
  const [input, SetInput] = useState('');

  const handleKeyPressed = (e: any) =>{
    if(e.key == 'Enter'){
      let path = props.path;
      path = path + '/search=' ;
      history.push({
        pathname: path,
        search: `${input}`,  
        state: { 
          update: true, 
        },
      });
    }
  };

  return (
    <div className="px-4 py-2 flex w-1/3 sm:w-2/5">
      <Input
        border="full"
        type="text"
        placeholder="Search"
        classname="shadow-md"
        icon={{
          icon: (
            <InlineIcon icon={searchOutline} style={{ fontSize: 'inherit' }} />
          ),
          position: 'left',
        }}
        onChange = {(e) => SetInput(e.target.value)}
        onKeyDown = { handleKeyPressed }
      />
    </div>
  );
}
