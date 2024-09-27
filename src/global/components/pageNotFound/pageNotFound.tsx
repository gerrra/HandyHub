import { MainTemplate } from '../mainTemplate/mainTemplate';
import './pageNotFound.scss';

export const PageNotFound = () => {
    return (
        <MainTemplate
            collapseMenu
            content={<PageNotFoundContent />}
            fullHeight
        />
    )
}

const PageNotFoundContent = () => {
    return (
        <div className="page-not-found">
            <h1>
                Page not found
            </h1>
        </div>
    )
}