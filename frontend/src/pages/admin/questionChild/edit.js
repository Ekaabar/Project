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


class EditQuestionChildAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            title: 'title question child ',
            description: 'description question child ',
            enable: 1,
            imageUrl: null,
            quizCategoryQuestionOptionCorrects: [],
            error: null,
            url_action_quest_child: "quiz/category/question/child/",
            url_action_quest_option: "quiz/category/question/option/",
            data_question_options: [],
            quest_child_id: this.props.params.id,
            quest_id: "",
            options: [],

            // optionsQuestionType: [{ label: "Text", value: "text" }, { label: "Photo", value: "photo" }],
            optionsQuestionType: [{ label: "Text", value: "text" }],
            optionsAnswerSelectionType: [{ label: "Single", value: "single" }, { label: "Multiple", value: "multiple" }],
            selectedAnswerSelectionType: [],
            selectedQuestionType: [],
            selectedAnswerSelectionTypeValue: [],
            selectedQuestionTypeValue: [],
            selectedOptionCorrect: [],
            selectedOptionCorrectValue: [],
            selectedOptionCorrectIsMulti: true,
            point: null,
            imageUrlFile: [],
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeSelectOptionCorrect = this.handleChangeSelectOptionCorrect.bind(this);
        this.handleChangeSelectQuestionType = this.handleChangeSelectQuestionType.bind(this);
        this.handleChangeSelectAnswerSelectionType = this.handleChangeSelectAnswerSelectionType.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeImage = this.handleChangeImage.bind(this);

    }


    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        console.log(target.value)
        console.log(target.name)
        this.setState({
            [name]: value
        });
    }

    handleChangeImage(e) {
        console.log(e.target.files[0]);
        this.setState({ imageUrlFile: e.target.files });
    }

    handleChangeSelectOptionCorrect(event) {
        console.log(event);
        var selectedOptionCorrect = this.state.selectedOptionCorrectIsMulti ? event.map(obj => obj.value) : event.value;
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
            selectedAnswerSelectionTypeValue: event,
            selectedOptionCorrectIsMulti: event.value === "multiple" ? true : false,
            selectedOptionCorrectValue: event.value === "multiple" ? this.state.selectedOptionCorrectValue : this.state.selectedOptionCorrectValue[0],
        });
    }

    componentDidMount() {
        API.get(this.state.url_action_quest_child + this.state.quest_child_id)
            .then(res => {
                const data = res.data;
                console.log(data);
                this.setState({
                    data: data,
                    title: data.title,
                    description: data.description,
                    enable: data.enable,
                    imageUrl: data.imageUrl,
                    quest_id: data.quizCategoryQuestionParent._id,
                    // quizCategoryQuestionOptionCorrects: data.quizCategoryQuestionOptionCorrects,
                    quizCategoryQuestionOptionCorrects: data.quizCategoryQuestionOptionCorrects.map(option => ({
                        "label": option.title,
                        "value": option._id,
                    })),
                    selectedOptionCorrectValue: data.quizCategoryQuestionOptionCorrects.map(option => ({
                        "label": option.title,
                        "value": option._id,
                    })),
                    selectedOptionCorrect: data.quizCategoryQuestionOptionCorrects.map(option => option._id),
                    selectedAnswerSelectionTypeValue: [{
                        label: data.answerSelectionType,
                        value: data.answerSelectionType
                    }],
                    selectedAnswerSelectionType: data.answerSelectionType,
                    selectedQuestionTypeValue: [{
                        label: data.questionType,
                        value: data.questionType
                    }],
                    selectedQuestionType: data.questionType,
                    point: data.point,
                    selectedOptionCorrectIsMulti: data.answerSelectionType === "multiple" ? true : false,

                });

                API.get(this.state.url_action_quest_option + "question/" + this.state.quest_id)
                    .then(res => {
                        const data_question_options = res.data;
                        console.log(res.data)
                        const options = data_question_options.map(option => ({
                            "label": option.title,
                            "value": option._id,
                        }));

                        this.setState({ data_question_options, options });

                    });
            });
    }


    handleSubmit(event) {
        event.preventDefault();
        let formData = new FormData();

        formData.append('title', this.state.title);
        formData.append('description', this.state.description);
        formData.append('enable', this.state.enable);
        formData.append('quizCategoryQuestionParent', this.state.quest_id);
        formData.append('quizCategoryQuestionOptionCorrects', this.state.selectedOptionCorrect);
        formData.append('questionType', this.state.selectedQuestionType);
        formData.append('answerSelectionType', this.state.selectedAnswerSelectionType);
        formData.append('point', this.state.point);
        if (this.state.imageUrlFile[0])
            formData.append('imageUrl', this.state.imageUrlFile[0]);

        console.log(this.state.point);
        console.log(this.state.selectedAnswerSelectionType);
        console.log(this.state.quest_id);
        console.log(this.state.enable);
        console.log(this.state.description);
        console.log(this.state.imageUrlFile);
        console.log(this.state.selectedQuestionType);
        console.log(this.state.selectedOptionCorrect);

        API.put(this.state.url_action_quest_child + this.state.quest_child_id, formData)
            .then(res => {
                console.log(res)
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
                                    <label className="form-label" htmlFor="formControlInputPoint">Point {this.state.point} </label>
                                    <input defaultValue={this.state.point} onChange={this.handleChange} type="number" min="0" className="form-control" name="point" id="formControlInputPoint" required />
                                </div>

                                <div className="mb-3">
                                    <label for="formFile" className="form-label">
                                        Image
                                    </label>
                                    <input className="form-control" type="file" name='imageUrlFile' onChange={this.handleChangeImage} id="formFile" />

                                    {this.state.imageUrl &&
                                        <>
                                            <img src={this.state.imageUrl} className="img-thumbnail" alt="..." />
                                        </>
                                    }

                                </div>

                                <div className="form-group my-2">
                                    <label className="form-label" htmlFor="exampleFormControlFile1">Question Type</label>
                                    <Select onChange={this.handleChangeSelectQuestionType} options={this.state.optionsQuestionType} value={this.state.selectedQuestionTypeValue} />
                                </div>

                                <div className="form-group my-2">
                                    <label className="form-label" htmlFor="exampleFormControlFile1">Answer Selection Type</label>
                                    <Select onChange={this.handleChangeSelectAnswerSelectionType} options={this.state.optionsAnswerSelectionType} value={this.state.selectedAnswerSelectionTypeValue} />
                                </div>

                                <div className="form-group my-2">
                                    <label className="form-label" htmlFor="exampleFormControlFile1">Corrects option</label>
                                    <Select isMulti={this.state.selectedOptionCorrectIsMulti} onChange={this.handleChangeSelectOptionCorrect} options={this.state.options} value={this.state.selectedOptionCorrectValue} />
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
export default withParams(EditQuestionChildAdmin)
