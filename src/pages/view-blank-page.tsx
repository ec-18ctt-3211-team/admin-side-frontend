import Searchbar from 'components/common/searchbar';
import { Layout } from 'components/common';
import { SITE_PAGES } from 'constants/pages.const';

interface Props {
  path: string;
}

export default function ViewBlankPage(props: Props): JSX.Element{
  let type: string;
  if(props.path === SITE_PAGES.VIEW_A_ROOM.path){
    type = 'Room ID';
  }
  else if(props.path === SITE_PAGES.VIEW_A_HOST.path){
    type = 'Host ID';
  }
  else type = 'Customer ID';
  
  return(      
    <div className = 'h-full flex'>
      <Layout>
        <div className =' bg-white rounded-lg border-b p-2 h-full'>
          <Searchbar path={props.path} type={type}></Searchbar>
        </div>
      </Layout>
    </div>
  );
}
