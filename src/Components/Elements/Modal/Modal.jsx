import { useEffect, useState } from 'react'
import './Modal.sass'
import PutServices from '../../../Api/PutServices'
// import AddServices from '../../../Api/AddServices'

export default function Modal({ options, closeModal }) {

    const [isEmptyEng, setEmptyEng] = useState(false)
    const [isEmptyTranslate, setEmptyTranslate] = useState(false)
    const [isEmptyTranscript, setEmptyTranscript] = useState(false)
    const [errorMsgEng, setErrorMsgEng] = useState('field cannot be empty')
    const [errorMsgTranslate, setErrorMsgTranslate] = useState('field cannot be empty')
    const [errorMsgTranscript, setErrorMsgTranscript] = useState('field cannot be empty')
    const [formValid, setFormValid] = useState(false)

    useEffect(() => {
        if (errorMsgEng || errorMsgTranslate || errorMsgTranscript) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [errorMsgEng, errorMsgTranslate, errorMsgTranscript, options.flagDelCard, options.rerenderCard])

    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'english':
                if (e.target.value === "") {
                    setEmptyEng(true)
                } else {
                    setErrorMsgEng("")
                }
                break
            case 'translate':
                if (e.target.value === "") {
                    setEmptyTranslate(true)
                } else {
                    setErrorMsgTranslate("")
                }
                break
            case 'transcription':
                if (e.target.value === "") {
                    setEmptyTranscript(true)
                } else {
                    setErrorMsgTranscript("")
                }
                break
        }
    }

    function getValueFormEnglish(e) {
        options.setFormEnglish(e.target.value)
    }

    function getValueFormTranslate(e) {
        options.setFormTranslate(e.target.value)
    }

    function getValueFormTranscript(e) {
        options.setFormTranscript(e.target.value)
    }

    let englishValue = ""
    let translateValue = ""
    let transcriptionValue = ""

    if (options.card) {
        englishValue = options.card[0].english
        translateValue = options.card[0].russian
        transcriptionValue = options.card[0].transcription
    }

    //редактирование карточек
    function ediCard() {
        PutServices.putCard(options.formEnglish, options.formTranslate, options.formTranscript, options.card[0].id)
        options.setRerenderCard(!options.rerenderCard)
        options.setModal(false)
        options.setRerenderCard(!options.rerenderCard)
    }
    
    // //добавление слова
    // function addCard() {
    //     AddServices.addCards(options.formEnglish, options.formTranslate, options.formTranscript, options.card[0].id)
    //     options.setRerenderCard(!options.rerenderCard)
    //     options.setModal(false)
    //     options.setRerenderCard(!options.rerenderCard)
    // }
    

    return (
        <>
            <div className="modal">
                <div className="modal__content">
                    <div>
                        <form>
                            <div className="modal__form">
                                <div>
                                    {(isEmptyEng && errorMsgEng) && <div className='modal__error'>{errorMsgEng}</div>}
                                    <input onBlur={e => blurHandler(e)} onChange={getValueFormEnglish} defaultValue={englishValue} className="modal__input" type="text" placeholder="english" name="english" />
                                </div>
                                <div>
                                    {(isEmptyTranslate && errorMsgTranslate) && <div className='modal__error'>{errorMsgTranslate}</div>}
                                    <input onBlur={e => blurHandler(e)} onChange={getValueFormTranslate} defaultValue={translateValue} className="modal__input" type="text" placeholder="translate" name="translate" />
                                </div>
                                <div>
                                    {(isEmptyTranscript && errorMsgTranscript) && <div className='modal__error'>{errorMsgTranscript}</div>}
                                    <input onBlur={e => blurHandler(e)} onChange={getValueFormTranscript} defaultValue={transcriptionValue} className="modal__input" type="text" placeholder="transcription" name="transcription" />
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="modal__btns">
                        <button disabled={!formValid} onClick={() => {
                            ediCard() 
                            // addCard()
                            closeModal(false)}}>save</button>
                        <button onClick={() => {
                            closeModal(false)}}>cancel</button>
                    </div>
                </div>
            </div>
        </>
    )
}
