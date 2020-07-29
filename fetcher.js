// Data Fetcher

$(document).ready(function() {
    // DB URI pattern management, still can run just on 000 folder
    let pathAnime = document.documentURI;
    let animeId = "?id=";
    let posId = pathAnime.indexOf(animeId);
    pathAnime = pathAnime.substr(posId + animeId.length, pathAnime.length);
    let baseDbUrl = "./json/000/";
    if (pathAnime > 9) {
        baseDbUrl += "0" + pathAnime + ".json";
    } else if (pathAnime > 99) {
        baseDbUrl += pathAnime + ".json";
    } else {
        baseDbUrl += "00" + pathAnime + ".json";
    }

    let url = "https://raw.githubusercontent.com/yeheizkiel/Ryuuganime-Nightly/master/json/000/003.json?t=" + Date.now(); // Testing URL

    $.getJSON(url, function(data) {
        // Variable declarations
        let postTitle = data.title.en_Latn;
        let titleId, scoreId, scoreRefer, genre = "", tag = "", scoreLink = "";
        let arrGenre = data.information.serialGenre.id_ID; // shorter variable
        let arrTag = data.information.serialTags.id_ID; // shorter variable
        let score = $('.score').attr('href');
        let scoreException = "AnimePlanet";

        console.log(data);
        
        $('.post-title')[0].html(postTitle);
        $('img:first').attr("src", data.backdrop);
        $('#synopsis').html(data.synopsis.id_ID); // using id_ID (default)

        $('.title').each(function () {
            titleId = "#"+this.id;
            $(titleId).html(data.title[this.id]);
        });

        $('#synonyms').html(data.information.synonyms.id_ID); // using id_ID (default)
        $('#type').html(data.information.type.id_ID); // using id_ID (default)
        $('#episode').html(data.information.episode);
        
        $('#status').html(data.information.status.id_ID); // using id_ID (default)

        $.each(arrGenre, function(index, value) { // Looping to get each genre and merge them
            if (index == arrGenre.length - 1) {
                genre += value;
            } else {
                genre += value+", ";
            }
        });

        $('#serialGenre').html(genre); // using id_ID (default), after merging done, show them

        $.each(arrTag, function(index, value) { // Looping to get each tag and merge them
            if (index == arrTag.length - 1) {
                tag += value;
            } else {
                tag += value+", ";
            }
        });

        $('#serialTags').html(tag); // using id_ID (default), after merging done, show them
        $('#releaseSeason').html(data.information.releaseSeason.id_ID); // using id_ID (default)
        $('#releaseYear').html(data.information.releaseYear);

        function relendDate(date) {
            let dmyDate = new Date(date); // M-D-YYYY
            let d = dmyDate.getDate();
            let m = dmyDate.getMonth() + 1;
            let y = dmyDate.getFullYear();
            dmyDate = (d <= 9 ? '0' + d : d) + '-' + (m <= 9 ? '0' + m : m) + '-' + y;
            return dmyDate;
        }

        $('#releaseDate').html(relendDate(data.information.releaseDate));
        data.information.endDate != null ? $('#endDate').html(relendDate(data.information.endDate)) : $('#endDate').html("?");

        $('#duration').html(data.information.duration);
        $('#studio').html(data.information.studio);
        $('#rating').html(data.information.rating);

        data.information.isNsfw == false ? $('#nsfwTag').html("Tidak") : $('#nsfwTag').html("Ya"); // NSFW Condition
        
        $('#adaptation').html(data.information.adaptation.id_ID); // using id_ID (default)
        $('#country').html(data.information.country.id_ID); // using id_ID (default)
        $('#country').html(data.information.country.id_ID); // using id_ID (default)

        $('.score').each(function () {
            scoreId = this.id;
            scoreRefer = "#"+this.id;
            if (score != "") {
                if (!data.scores[scoreId].id) {
                    if (data.scores[scoreId].code) {
                        scoreLink = $(scoreRefer).attr('href') + data.scores[scoreId].code;
                    } else if (data.scores[scoreId].base64){
                        scoreLink = $(scoreRefer).attr('href') + data.scores[scoreId].base64;
                    } else {
                        scoreLink = decodeURIComponent($(scoreRefer).attr('href') + "?s=" + data.title.native);
                    }
                } else if (scoreId == scoreException) {
                    scoreLink = $(scoreRefer).attr('href') + data.scores[scoreId].url;
                } else {
                    scoreLink = $(scoreRefer).attr('href') + data.scores[scoreId].id;
                }
            }
            $(scoreRefer).attr('href', scoreLink);

            if (data.scores[scoreId].score == null) {
                $(scoreRefer).html(0);
            } else {
                $(scoreRefer).html(data.scores[scoreId].score);
            }
        });

        $('#updatedDate').html(new Date(data.updatedDate));

    });
});
