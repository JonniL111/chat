import React, { useState, useEffect, useRef, useCallback } from 'react';
import './upload.css';

const bytesToSize = (bytes) => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (!bytes) {
    return '0 Byte';
  }
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
};

//компонент кнопок управления
const Button = ({ classes = [], content, type = 'submit', clickHandler }) => {
  return (
    <button onClick={clickHandler} className={classes.join(' ')} type={type}>
      {content}
    </button>
  );
};

function Upload({ handlerSend }) {
  const attributes = {
    multiple: true,
    accept: ['.png', '.jpg', '.jpeg', '.gif'],
  };

  const [files, setFiles] = useState([]);
  const [images, setImages] = useState([]);
  const refInput = useRef(null);

  //запускаем инпут по нажатию кнопки
  const triggerInput = () => {
    const input = refInput.current;
    input.click();
  };

  //при изменении инпута получаем выбранные файлы
  const changeHandler = (e) => {
    if (!e.target.files.length) return;
    const files = Array.from(e.target.files); //получаем коллекцию загруженных файлов
    setFiles(files);
  };
  //отслеживаем выбор файлов и добавление их в state, для получения ключей изображения
  useEffect(() => {
    setImages([]);
    files.forEach((file) => {
      const reader = new FileReader(); //создаем FileReader для работы с бинарным кодом файлов
      reader.readAsDataURL(file);
      reader.onload = (ev) => {
        const src = ev.target.result;
        setImages((prevVal) => [...prevVal, { src, name: file.name, size: file.size }]);
      };
    });
  }, [files]);
  //выводим блок превью с превьюшками
  const Preview = useCallback(({ images }) => {
    const listPreview = images.map((image) => (
      <div className="preview-image" key={image.name}>
        <div className="preview-remove" data-name={image.name}>
          &times;
        </div>
        <img src={image.src} alt={image.name} />
        <div className="preview-info">
          <span>{image.name}</span>
          {bytesToSize(image.size)}
        </div>
      </div>
    ));
    return (
      <div onClick={deleteImage} className="preview">
        {listPreview}
      </div>
    );
  }, []);

  const deleteImage = (e) => {
    if (!e.target.dataset.name) return;
    const { name } = e.target.dataset;
    setImages((files) => files.filter((file) => file.name !== name));
  };

  const cleanImages = () => {
    if (handlerSend) {
      handlerSend(images);
    }
    setFiles([]);
  };

  return (
    <div className="card">
      <input onChange={changeHandler} ref={refInput} type="file" {...attributes} />
      <Button clickHandler={triggerInput} classes={['btn']} content="Открыть" />
      {!images.length || (
        <Button clickHandler={cleanImages} classes={['btn', 'primary']} content="Загрузить" />
      )}
      <Preview images={images} />
    </div>
  );
}

export default Upload;
