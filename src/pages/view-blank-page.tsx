import Searchbar from 'components/common/searchbar';
import { Layout } from 'components/common';

interface Props {
  path: string;
}

export default function ViewBlankPage(props: Props): JSX.Element{
  return(      
    <div className = 'h-full flex'>
      <Layout>
        <div className =' bg-white rounded-lg border-b p-2 h-full'>
          <Searchbar path={props.path}></Searchbar>
        </div>
      </Layout>
    </div>
  );
}