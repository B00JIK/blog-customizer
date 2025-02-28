import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { ArticleStateType, defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [styleArticle, setStyleArticle] =
		useState<ArticleStateType>(defaultArticleState);

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': styleArticle.fontFamilyOption.value,
					'--font-size': styleArticle.fontSizeOption.value,
					'--font-color': styleArticle.fontColor.value,
					'--container-width': styleArticle.contentWidth.value,
					'--bg-color': styleArticle.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm onChange={setStyleArticle}/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
