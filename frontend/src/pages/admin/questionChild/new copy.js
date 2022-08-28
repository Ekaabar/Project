import React, { Component } from 'react';
import SideBareAdmin from '../../../components/SideBareAdmin';
import HeaderAdmin from '../../../components/HeaderAdmin';
import ToolbarAdmin from '../../../components/ToolbarAdmin';
import '../../../components/SideBare.css';
import API from '../../../services/api';
// import Moment from 'react-moment';
import 'moment-timezone';
// import ReactTable from "react-table-v6";
import { withParams } from '../../../services/HOC';
import Select from 'react-select'


class NewQuestionChildAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            title: 'title question child ',
            description: 'description question child ',
            enable: 1,
            imageUrl: "https://fakeimg.pl/350x200/?text=Hello",
            selectedOptionCorrect: [],
            error: null,
            url_action_quest_child: "quiz/category/question/child/",
            url_action_quest_option: "quiz/category/question/option/",
            data_question_options: [],
            quest_id: this.props.params.quest_id,
            options: [],
            optionsQuestionType: [{ label: "Text", value: "text" }],
            optionsAnswerSelectionType: [{ label: "Single", value: "single" }, { label: "Multiple", value: "multiple" }],
            selectedAnswerSelectionType: [],
            selectedQuestionType: [],
            selectedAnswerSelectionTypeValue: [],
            selectedQuestionTypeValue: [],
            point: 0,
            imageUrlFile: [],
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeSelectOptionCorrect = this.handleChangeSelectOptionCorrect.bind(this);
        this.handleChangeSelectQuestionType = this.handleChangeSelectQuestionType.bind(this);
        this.handleChangeSelectAnswerSelectionType = this.handleChangeSelectAnswerSelectionType.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeImage = this.handleChangeImage.bind(this);

    }

    handleChangeImage(e) {
        console.log(e.target.files[0]);
        this.setState({ imageUrlFile: e.target.files });
    }

    handleChange(event) {
        const target = event.target;
        console.log(event);

        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleChangeSelectOptionCorrect(event) {
        console.log(event);
        var selectedOptionCorrect = event.map(obj => obj.value);
        console.log(event)
        this.setState({
            selectedOptionCorrect: selectedOptionCorrect,
            selectedOptionCorrectValue: event
        });
    }
    handleChangeSelectQuestionType(event) {
        console.log(event);
        var selectedQuestionType = event.value;
        this.setState({
            selectedQuestionType,
            selectedQuestionTypeValue: event
        });
    }
    handleChangeSelectAnswerSelectionType(event) {
        var selectedAnswerSelectionType = event.value;
        this.setState({
            selectedAnswerSelectionType,
            selectedAnswerSelectionTypeValue: event
        });
    }

    componentDidMount() {

        API.get(this.state.url_action_quest + this.state.quest_id)
            .then(res => {
                const data = res.data;
                this.setState({
                    data: data,
                });
            });

        API.get(this.state.url_action_quest_option + "question/" + this.state.quest_id)
            .then(res => {
                const data_question_options = res.data;
                const options = [];
                for (let index = 0; index < data_question_options.length; index++) {
                    var element = [];
                    element['value'] = data_question_options[index]['_id'];
                    element['label'] = data_question_options[index]['title'];
                    options.push(element);
                }
                this.setState({ data_question_options, options });

            });
    }

    handleSubmit(event) {
        event.preventDefault();
        let formData = new FormData();

        formData.append("title", this.state.title);
        formData.append("description", this.state.description);
        formData.append("enable", this.state.enable);
        if (this.state.imageUrlFile[0])
            formData.append("imageUrl", this.state.imageUrlFile[0]);
        formData.append("quizCategoryQuestionParent", this.state.quest_id);
        formData.append("quizCategoryQuestionOptionCorrects", this.state.selectedOptionCorrect);
        formData.append("questionType", this.state.selectedQuestionType);
        formData.append("answerSelectionType", this.state.selectedAnswerSelectionType);
        formData.append("point", this.state.point);

        API.post(this.state.url_action_quest_child,
            formData, {
            headers: {
                "Content-Type": "multipart/form-data;",
            },
        }).then(res => {
            this.props.navigate('/admin/question/' + this.state.quest_id + '/view');
        }).catch(error => {
            this.setState({ error: "A problem has occurred. Please try again later." });
        });
    }


    handleSubmitOld(event) {
        event.preventDefault();
        API.post(this.state.url_action_quest_child, {
            title: this.state.title,
            description: this.state.description,
            enable: this.state.enable,
            imageUrl: this.state.imageUrl,
            quizCategoryQuestionParent: this.state.quest_id,
            quizCategoryQuestionOptionCorrects: this.state.selectedOptionCorrect,
            questionType: this.state.selectedQuestionType,
            answerSelectionType: this.state.selectedAnswerSelectionType,
            point: this.state.point,
        }).then(res => {
            this.props.navigate('/admin/question/' + this.state.quest_id + '/view');
        }).catch(error => {
            this.setState({ error: "A problem has occurred. Please try again later." });
        });
    }

    render() {

        return (
            <div>
                <HeaderAdmin />
                <div className="container-fluid">
                    <div className="row">
                        <SideBareAdmin />
                        <main role="main" className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                            <ToolbarAdmin />
                            <h2>Question child add </h2>

                            {this.state.error && <><div className="alert alert-danger" role="alert"> {this.state.error}</div></>}
                            <form onSubmit={this.handleSubmit}>

                                <div className="form-group my-2">
                                    <label className="form-label" htmlFor="formControlInputTitle">Title</label>
                                    <input defaultValue={this.state.title} onChange={this.handleChange} type="text" className="form-control" name="title" id="formControlInputTitle" required />
                                </div>
                                <div className="form-group my-2">
                                    <label className="form-label" htmlFor="formControlInputDescription">Description</label>
                                    <textarea defaultValue={this.state.description} onChange={this.handleChange} className="form-control" name="description" id="formControlInputDescription" required />
                                </div>

                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" defaultValue={this.state.enable}
                                        onChange={this.handleChange} id="flexCheckChecked" name="enable" checked={this.state.enable} />
                                    <label className="form-check-label" for="flexCheckChecked">
                                        Enable
                                    </label>
                                </div>
                                <div className="form-group my-2">
                                    <label className="form-label" htmlFor="formControlInputPoint">Point</label>
                                    <input defaultValue={this.state.point} onChange={this.handleChange} type="number" min="0" className="form-control" name="point" id="formControlInputPoint" required />
                                </div>
                                <div className="mb-3">
                                    <label for="formFile" className="form-label">Image</label>
                                    <input className="form-control" type="file" id="formFile" />
                                </div>

                                <div className="form-group my-2">
                                    <label className="form-label" htmlFor="exampleFormControlFile1">Corrects option</label>
                                    <Select isMulti={true} onChange={this.handleChangeSelectOptionCorrect} options={this.state.options} value={this.state.selectedOptionCorrectValue} />
                                </div>

                                <div className="form-group my-2">
                                    <label className="form-label" htmlFor="exampleFormControlFile1">Question Type</label>
                                    <Select onChange={this.handleChangeSelectQuestionType} options={this.state.optionsQuestionType} value={this.state.selectedQuestionTypeValue} />
                                </div>

                                <div className="form-group my-2">
                                    <label className="form-label" htmlFor="exampleFormControlFile1">Answer Selection Type</label>
                                    <Select onChange={this.handleChangeSelectAnswerSelectionType} options={this.state.optionsAnswerSelectionType} value={this.state.selectedAnswerSelectionTypeValue} />
                                </div>

                                <button className="btn btn-primary" type="submit">Save</button>
                            </form>
                        </main>
                    </div>
                </div>
            </div>
        );
    }
}

export default withParams(NewQuestionChildAdmin)