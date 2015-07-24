# dropzone
jQuery Image Uploader

Парметры плагина:
<table>
<tr>
<td>nameClass</td>
<td>upload-filename</td>
<td>Устанавленивает CSS класс ячейки имени загружаемого файла</td>
</tr>
<tr>
<td>progressClass</td>
<td>upload-progress-bar</td>
<td>Устанавленивает CSS класс блока обертки индикатора прогресса</td>
</tr>
<tr>
<td>lineClass</td>
<td>upload-progress-line</td>
<td>Устанавленивает CSS класс блока линии индикатора прогресса</td>
</tr>
<tr>
<td>previewClass</td>
<td>upload-preview</td>
<td>Устанавленивает CSS класс блока превъю изображения</td>
</tr>
<tr>
<td>statusClass</td>
<td>upload-status</td>
<td>Устанавленивает CSS класс блока статуса</td>
</tr>
<tr>
<td>radioClass</td>
<td>upload-radio</td>
<td>Устанавленивает CSS класс блока radio кнопки</td>
</tr>
<tr>
<td>removeClass</td>
<td>upload-remove</td>
<td>Устанавленивает CSS класс блока с кнопкой удаления</td>
</tr>
<tr>
<td>tableClass</td>
<td>upload-table</td>
<td>Устанавленивает CSS класс таблицы</td>
</tr>
<tr>
<td>dropzoneClass</td>
<td>upload-drop-zone</td>
<td>Устанавленивает CSS класс блока загрузчика</td>
</tr>
<tr>
<td>dropzoneText</td>
<td>Drag and drop photo or click for select</td>
<td>Сообщение для вывода в блоке загрузчика</td>
</tr>
<tr>
<td>errorText</td>
<td>Error</td>
<td>Текст статуса ошибки</td>
</tr>
<tr>
<td>processText</td>
<td>Loading</td>
<td>Текст статуса процесса</td>
</tr>
<tr>
<td>successText</td>
<td>Success</td>
<td>Текст статуса успешной загрузки файла</td>
</tr>
<tr>
<td>uploadCallback</td>
<td></td>
<td>Callback функция, которая вызывается после успешной загрузки файла на сервер</td>
</tr>
<tr>
<td>removeCallback</td>
<td>function (value) { console.log('Remove callback. Value: ' + JSON.stringify(value)) }</td>
<td>Callback функция, которая вызывается после удаления изображения</td>
</tr>
<tr>
<td>removeText</td>
<td>Remove</td>
<td>Текст для кнопки удаления изображения</td>
</tr>
<tr>
<td>radioText</td>
<td>Set as default photo</td>
<td>Текст для кнопки выбора изображения по умолчанию</td>
</tr>
<tr>
<td>radioCallback</td>
<td>function (value) { console.log('Radio callback. Value: ' + JSON.stringify(value)) }</td>
<td>Callback функция, которая вызывается после нажатия кнопки выбора изображения по умолчанию</td>
</tr>
<tr>
<td>uploadUrl</td>
<td>/photo/upload</td>
<td>Адрес для отправки изображения на сервер</td>
</tr>
<tr>
<td>thumbWidth</td>
<td>90</td>
<td>Ширина превъю изображения</td>
</tr>
<tr>
<td>thumbHeight</td>
<td>64</td>
<td>Высота превъю изображения</td>
</tr>
<tr>
<td>fileSize</td>
<td>10000000</td>
<td>Максимальный размер файла</td>
</tr>
<tr>
<td>fileTypes</td>
<td>["image/jpeg", "image/png", "image/gif"]</td>
<td>Разрешенные типы файлов для загрузки</td>
</tr>
</table>
