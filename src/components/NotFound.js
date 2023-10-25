import React from 'react'
import NoResults from '../assets/empty.png'
import Asset from "./Asset";

const NotFound = () => {
	return (
		<div className={styles.NotFound}>
			<Asset
        		src={NoResults}
        		message={`Sorry, the page you're looking for doesn't exist`}
      		/>
		</div>
	);
};

export default NotFound