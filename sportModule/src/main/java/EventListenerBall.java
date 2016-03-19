import ag.sportradar.sdk.models.SREvent;
import ag.sportradar.sdk.models.SRMatch;
import ag.sportradar.sdk.propertychange.ISRPropertyChangeListener;
import ag.sportradar.sdk.propertychange.SRMatchProperty;
import ag.sportradar.sdk.propertychange.SRPropertyChangeEvent;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.Set;

/**
 * Created by floatec on 19/03/16.
 */
public class EventListenerBall implements ISRPropertyChangeListener<SRMatchProperty> {


    private static Logger logger = LoggerFactory.getLogger(JavaApplication.class);

    public void init(SRMatch match) {
        match.addPropertyChangeListener(this, SRMatchProperty.Events, SRMatchProperty.Statistics);
    }
    @Override
    public void propertyChange(SRPropertyChangeEvent<SRMatchProperty> event) {
        // update UI, when new
        if (event.getProperty() != SRMatchProperty.Events) {
            logger.info(((ArrayList<Object>)event.getNewValue()).get(0).getClass().getName());
        }else{
            /*SREvent[] sre=((Set<SREvent>)event.getNewValue() ).toArray();
            for(SREvent:){

            }*/
        }
        logger.info(event.getProperty().name());
        logger.info(event.getNewValue().getClass().getName());

    }
    @Override
    public void propertyError(SRMatchProperty property, Throwable throwable) {
        // TODO: handle error
    }

    @Override
    public void propertiesInitialStateLoaded() {

    }

    private void cleanup(SRMatch match) {
        match.removePropertyChangeListener(this, SRMatchProperty.Events, SRMatchProperty.Statistics);
    }
}
