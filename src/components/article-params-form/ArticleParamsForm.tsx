import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { useRef, useState } from 'react';
import clsx from 'clsx';
import { useClose } from '../hooks/useClose';
import { Select } from 'src/ui/select';
import { Text } from 'src/ui/text';
import { StoryDecorator } from 'src/ui/story-decorator';
import { fontFamilyOptions, fontSizeOptions, fontColors, backgroundColors, contentWidthArr, OptionType, ArticleStateType, defaultArticleState, } from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';


export type ArticleParamsFormProps = {
	onChange: React.Dispatch<React.SetStateAction<ArticleStateType>>;
};

export const ArticleParamsForm = ({onChange}: ArticleParamsFormProps) => {
	const defaultState = useRef<ArticleStateType>(defaultArticleState);
	const divRef = useRef<HTMLDivElement | null>(null);

	const [isMenuOpenButton, setIsMenuOpenButton] = useState<boolean>(false);
	const {isOpen, toggle, close} = useClose(isMenuOpenButton);

	const [fontFamily, setfontFamily] = useState<OptionType>(
		defaultState.current.fontFamilyOption
	);
	const [fontSize, setfontSize] = useState<OptionType>(
		defaultState.current.fontSizeOption
	);
	const [backgroundColor, setBackgroundColor] = useState<OptionType>(
		defaultState.current.backgroundColor
	);
	const [fontColor, setFontColor] = useState<OptionType>(
		defaultState.current.fontColor
	);
	const [contentWidth, setContentWidth] = useState<OptionType>(
		defaultState.current.contentWidth
	);
 
	const changeFontFamily = (option: OptionType) => {
		setfontFamily(option);
	};

	const changefontSize = (option: OptionType) => {
		setfontSize(option);
	};

	const changeFontColor = (option: OptionType) => {
		setFontColor(option);
	};

	const changeBackgroundColor= (option: OptionType) => {
		setBackgroundColor(option);
	};

	const changeContentWidth= (option: OptionType) => {
		setContentWidth(option);
	};

	useOutsideClickClose({
		isOpen: isMenuOpenButton,
		rootRef: divRef,
		onChange: close,
		onClose: () => setIsMenuOpenButton(false),
	});

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onChange({
			fontFamilyOption: fontFamily,
			fontSizeOption: fontSize,
			backgroundColor: backgroundColor,
			fontColor: fontColor,
			contentWidth: contentWidth
		})
	}

	const handleOnClickButtonReset = () => {
		onChange(defaultState.current);
		setfontFamily(defaultState.current.fontFamilyOption);
		setfontSize(defaultState.current.fontSizeOption);
		setBackgroundColor(defaultState.current.backgroundColor);
		setFontColor(defaultState.current.fontColor);
		setContentWidth(defaultState.current.contentWidth);
	};


	return (
		<div ref={divRef}>
			<ArrowButton isOpen={isOpen} onClick={toggle} />
			<aside className={clsx(styles.container, {
					[styles.container_open]: isOpen,
				})}>
				<form className={styles.form} onSubmit={handleSubmit} onReset={handleOnClickButtonReset}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						options={fontFamilyOptions}
						selected={fontFamily}
						onChange={changeFontFamily}
						title='Шрифт'
					/>
					<RadioGroup 
						options={fontSizeOptions}
						selected={fontSize}
						onChange={changefontSize}
						title='Размер текста'
						name='fontSize'
					/>
					<Select
						options={fontColors}
						selected={fontColor}
						onChange={changeFontColor}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						options={backgroundColors}
						selected={backgroundColor}
						onChange={changeBackgroundColor}
						title='Цвет фона'
					/>
					<Select
						options={contentWidthArr}
						selected={contentWidth}
						onChange={changeContentWidth}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear'/>
						<Button title='Применить' htmlType='submit' type='apply'/>
					</div>
				</form>
			</aside>
		</div>
	);
};
