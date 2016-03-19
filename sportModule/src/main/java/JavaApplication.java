import ag.sportradar.sdk.SRConfiguration;
import ag.sportradar.sdk.SRMatchList;
import ag.sportradar.sdk.SRNetworkCall;
import ag.sportradar.sdk.enums.SRConstEventTypes;
import ag.sportradar.sdk.enums.SRConstMatchStatuses;
import ag.sportradar.sdk.enums.SRConstSports;
import ag.sportradar.sdk.java.SRSDK;
import ag.sportradar.sdk.models.*;
import ag.sportradar.sdk.propertychange.ISRPropertyChangeListener;
import ag.sportradar.sdk.propertychange.SRMatchProperty;
import ag.sportradar.sdk.propertychange.SRPropertyChangeEvent;
import ag.sportradar.sdk.responses.SRMatchesResponse;
import ag.sportradar.sdk.responses.SRObjectResponse;
import com.fasterxml.jackson.databind.deser.DataFormatReaders;
import com.squareup.okhttp.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.util.List;

public class JavaApplication   {

    private static Logger logger = LoggerFactory.getLogger(JavaApplication.class);

    private static EventListenerBall elb=new EventListenerBall();
    int partofTheGame=0;

    public static final MediaType JSON
            = MediaType.parse("application/json; charset=utf-8");

    static OkHttpClient client = new OkHttpClient();

    static String post(String url, String json) throws IOException {
        RequestBody body = RequestBody.create(JSON, json);
        Request request = new Request.Builder()
                .url(url)
                .post(body)
                .build();
        Response response = client.newCall(request).execute();
        return response.body().string();
    }

    public static void main(String[] params) {

        // start SDK with configuration
        SRConfiguration config = new SRConfiguration()
                .setAppKey("bad37db073ff689abbd68f587389ce2b");
        SRSDK.start(config).get();

        // just create sample match list request
        SRMatchesResponse matchesResponse = SRMatchList.getForDay(0).get();
        List<SRMatch> matches = matchesResponse.getMatches();
        for (SRMatch match : matches) {
            logger.info(match.getMatchId()+" "+match.getTournament().getName());
            logger.info(match.getTeam1().getName());
            logger.info(match.getTeam2().getName());
        }
        // display matches by sport
        SRConstSports currentSport = null;
        SRMatch match=SRMatch.getById(7518292).get().getObject();
        //elb.init(match);

            logger.info(match.getTeam1().getName());
        logger.info(match.getTeam2().getName());

            for (SREvent ev:match.loadEvents()
                 ) {
               logger.info(ev.getTime()+ev.getTypeId().toString());
                //logger.info(ev.getTypeId().toString());
                if(ev.getTypeId()== SRConstEventTypes.EVENTTYPE_SCORE_CHANGED){
                    logger.info(ev.getTypeId().toString());
                    logger.info(ev.getClass().getName());
                    logger.info(ev.getTeam().getName());
                   SRPlayer[] players=((SREventScoreChange) ev).getPlayers();
                    logger.info(players[players.length-1].getFullname());
                    try {
                        post("http://10.100.105.102:3000/inputTor","{\"time\":\""+ev.getTime()+"\",\"team\":\""+ev.getTeam().getName()+"\",\"team_img\":\""+ev.getTeam().teamCrestURL(true)+"\",\"player\":\""+players[players.length-1].getFullname()+"\",\"player_img\":\""+players[players.length-1].playerImageURL()+"\"}");
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }

                if(ev.getTypeId()==SRConstEventTypes.EVENTTYPE_SHOT_OFF_TARGET){
                    logger.info(ev.getName());
                    try {
                        post("http://10.100.105.102:3000/inputVerschossen","{\"time\":\""+ev.getTime()+"\",\"team\":\""+ev.getTeam().getName()+"\",\"team_img\":\""+ev.getTeam().teamCrestURL(true)+"\"}");
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
                if(ev.getTypeId()==SRConstEventTypes.EVENTTYPE_YELLOW_CARD){
                    SREventSoccerCard cardEv=(SREventSoccerCard)ev;
                    logger.info(cardEv.getPlayer()+" "+cardEv.getName());
                    try {
                        post("http://10.100.105.102:3000/inputGelbeKarten","{\"time\":\""+ev.getTime()+"\",\"team\":\""+cardEv.getTeam().getName()+"\",\"team_img\":\""+cardEv.getTeam().teamCrestURL(true)+"\",\"player\":\""+cardEv.getPlayer().getFullname()+"\",\"player_img\":\""+cardEv.getPlayer().playerImageURL()+"\"}");
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
                if(ev.getTypeId()==SRConstEventTypes.EVENTTYPE_RED_CARD||ev.getTypeId()==SRConstEventTypes.EVENTTYPE_RED_CARD_AFTER_SECOND_YELLOW){
                    SREventSoccerCard cardEv=(SREventSoccerCard)ev;
                    logger.info(cardEv.getPlayer()+" "+cardEv.getName());
                    try {
                        post("http://10.100.105.102:3000/inputRoteKarten","{\"time\":\""+ev.getTime()+"\",\"team\":\""+cardEv.getTeam().getName()+"\",\"team_img\":\""+cardEv.getTeam().teamCrestURL(true)+"\",\"player\":\""+cardEv.getPlayer().getFullname()+"\",\"player_img\":\""+cardEv.getPlayer().playerImageURL()+"\"}");
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
                if(ev.getTypeId()==SRConstEventTypes.EVENTTYPE_SUBSTITUTION){
                    SREventSoccerSubstitution cardEv=(SREventSoccerSubstitution)ev;
                    logger.info(cardEv.getPlayerOut().getFullname()+" "+cardEv.getPlayerIn().getFullname()+" "+cardEv.getName());
                    try {
                        post("http://10.100.105.102:3000/inputAuswechsel","{\"time\":\""+ev.getTime()+"\",\"team\":\""+ev.getTeam().getName()+"\",\"team_img\":\""+cardEv.getTeam().teamCrestURL(true)+"\",\"player_out\":\""+cardEv.getPlayerOut().getFullname()+"\",\"player_out_img\":\""+cardEv.getPlayerOut().playerImageURL()+"\",\"player_in\":\""+cardEv.getPlayerIn().getFullname()+"\",\"player_in_img\":\""+cardEv.getPlayerIn().playerImageURL()+"\"}");
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }


            }



          /*  // display sport title
            if (currentSport != match.getSportId()) {
                currentSport = match.getSportId();
                logger.info("\n");
                logger.info(match.getSport().getName());
                logger.info("-----------------------");
            }

            // build a line
            StringBuilder displayLine = new StringBuilder(match.getTeam1().getName());
            displayLine.append(" : ");
            displayLine.append(match.getTeam2().getName());

            // append result, for ended matches
            if (match.getStatus().getId() == SRConstMatchStatuses.MATCHSTATUS_ENDED) {
                displayLine.append(" [");
                displayLine.append(match.getResult().getTeam1Int());
                displayLine.append(" : ");
                displayLine.append(match.getResult().getTeam2Int());
                displayLine.append("]");
            }
            logger.info(displayLine.toString());*/


        //System.exit(0);
    }
}
