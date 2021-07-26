import Searchbar from 'components/common/searchbar';
import { Layout } from 'components/common';

interface Props {
  isAuthorized: boolean;
  setAuthorized: (isAuthorized: boolean) => void;
  path: string;
}

export default function ViewBlankPage(props: Props): JSX.Element{
  return(      
    <div className = 'h-full flex'>
      <Layout
        isAuthorized={props.isAuthorized}
        setAuthorized={props.setAuthorized}>
        <div className =' bg-white rounded-lg border-b p-2 h-full'>
          <Searchbar path={props.path}></Searchbar>
        </div>
      </Layout>
    </div>
  );
}