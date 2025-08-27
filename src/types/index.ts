export interface IProfileResp {
	intro: IIntro;
	projects: IProject[];
	technologies: ITechnology[];
	workExperiences: IWorkExperience[];
	educations: IEducation[];
	interests: string[];
	documents?: IDocument[];
	media?: IMedia[];
	resumeUrl: {
		sourceLink: string;
		fullVersionLink: string;
	};
}
export interface IIntro {
	name: string;
	nickname: string;
	phone: string;
	email: string;
	github: string;
	linkedin: string;
	location: string;
	website: string;
}

export interface IProject {
	name: string;
	details: string;
	url: string;
	hide: boolean;
}

export interface ITechnology {
	section: string;
	details: string;
}

export interface IWorkExperience {
	position: string;
	company: string;
	url: string;
	years: string[];
	details: string[];
}

export interface IEducation {
	head: string;
	details: string;
}

export interface IDocument {
	name: string;
	url: string; // absolute or relative path
	hide?: boolean;
}

export interface IMedia {
	name: string;
	url: string; // absolute or relative path
	type?: string; // e.g., 'video/quicktime'
	hide?: boolean;
}
